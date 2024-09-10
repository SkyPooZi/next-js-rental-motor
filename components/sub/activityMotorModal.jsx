import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { fetchActivityMotor } from "@/utils/services/fetchActivityMotor";

export default function ActivityMotorModal({ isOpen, onClose, motorId }) {
    const [activity, setActivity] = useState(null);
    const [changeLogs, setChangeLogs] = useState([]);
    const [isNotFound, setIsNotFound] = useState(false); // State to handle 404 case
    const token = Cookies.get("token");

    function formatDateInDutch(datetime) {
        const date = new Date(datetime);

        // Define Dutch month names
        const months = [
            'januari', 'februari', 'maart', 'april', 'mei', 'juni',
            'juli', 'augustus', 'september', 'oktober', 'november', 'december'
        ];

        // Get date components
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Get time components
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure minutes are always 2 digits
        let period = '';

        // Format to 12-hour clock
        if (hours >= 18) {
            period = 'malam'; // For 6 PM - 11:59 PM
            if (hours > 12) hours -= 12;
        } else if (hours >= 15) {
            period = 'sore'; // For 3 PM - 5:59 PM
            hours -= 12; // Convert to 12-hour clock
        } else if (hours >= 12) {
            period = 'siang'; // For 12 PM - 2:59 PM
            if (hours > 12) hours -= 12;
        } else {
            period = hours === 0 ? 'malam' : 'pagi'; // For AM (12 AM = malam, 1 AM - 11:59 AM = pagi)
            if (hours === 0) hours = 12; // Midnight should be 12 instead of 0
        }

        return `${day} ${month} ${year} ${hours}:${minutes} ${period}`;
    }

    useEffect(() => {
        const getActivityDetail = async () => {
            try {
                const response = await fetchActivityMotor(token, motorId);

                if (response && response.status === 200) {
                    const data = response.riwayatData;
                    setActivity(data);

                    // Call the function to check for changes
                    const logs = generateChangeLogs(data);
                    setChangeLogs(logs);
                    setIsNotFound(false); // Reset the 404 state if data is found
                } else if (response.status === 404) {
                    setIsNotFound(true); // Handle 404 case
                } else {
                    console.log("No data received or incorrect status");
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setIsNotFound(true); // Handle 404 error
                } else {
                    console.error("Failed to fetch activity details:", error);
                }
            }
        };

        if (motorId && isOpen) {
            getActivityDetail();
        }
    }, [token, motorId, isOpen]);

    const generateChangeLogs = (activityData) => {
        const logs = [];

        // Sort the activityData by datetime in descending order
        const sortedData = activityData.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

        sortedData.forEach((item) => {
            const { data_sebelum, data_sesudah, datetime, user } = item;

            const name = user?.nama_pengguna || "Unknown User";

            // Exclude created_at and updated_at
            const excludeKeys = ["created_at", "updated_at"];

            // Iterate over keys in data_sebelum and compare with data_sesudah
            for (const key in data_sebelum) {
                if (excludeKeys.includes(key)) continue; // Skip created_at and updated_at

                let beforeValue = data_sebelum[key];
                let afterValue = data_sesudah[key];

                // Check if the key is "is_hidden" and transform the value
                if (key === "is_hidden") {
                    beforeValue = beforeValue === 0 ? "Muncul" : "Disembunyikan";
                    afterValue = afterValue === 0 ? "Muncul" : "Disembunyikan";
                }

                // Only log if the data has changed
                if (beforeValue !== afterValue) {
                    logs.push(
                        `~ ${name} mengubah "${key}" dari "${beforeValue}" ke "${afterValue}" pada ${formatDateInDutch(datetime)}`
                    );
                }
            }
        });

        return logs;
    };

    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader>Activity Log</DialogHeader>
            {/* Make the body scrollable */}
            <DialogBody className="overflow-y-auto max-h-[400px]">
                {isNotFound ? (
                    <p>No changes detected.</p>
                ) : changeLogs.length > 0 ? (
                    <ul>
                        {changeLogs.map((log, index) => (
                            <li key={index} className="mb-2">
                                {log}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No changes detected.</p>
                )}
            </DialogBody>
            <DialogFooter>
                <Button color="red" onClick={onClose}>
                    Close
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
