import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { format } from 'date-fns'; // If you're using date-fns for date formatting

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";

const AllChart = () => {
    const [history, setHistory] = useState([]);
    const [activeComponent, setActiveComponent] = useState('chartDay');
    const [chartData, setChartData] = useState({
        type: 'line',
        height: 240,
        series: [
            {
                name: "Total Sewa",
                data: [],
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "Senin",
                    "Selasa",
                    "Rabu",
                    "Kamis",
                    "Jum`at",
                    "Sabtu",
                    "Minggu",
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    });

    const [totalHistory, setTotalHistory] = useState(0);

    const fetchData = async (filter) => {
        try {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/api/history/filtered?filter=${filter}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer 2|rkK6kLDRbFH91y0nNEZbHxU4QQ5hBlbkXyDDbT7B95119924`
                }
            });

            const responseText = await response.text();
            console.log('Response Text:', responseText);

            const fetchData = JSON.parse(responseText);
            console.log('Parsed JSON Data:', fetchData);

            setHistory(fetchData.data || []);

            if (fetchData.data) {
                if (filter === '7_hari') {
                    // Initialize a map for days of the week with zero values
                    const daysOfWeek = {
                        "Senin": 0,
                        "Selasa": 0,
                        "Rabu": 0,
                        "Kamis": 0,
                        "Jum`at": 0,
                        "Sabtu": 0,
                        "Minggu": 0,
                    };

                    // Aggregate data from API response
                    fetchData.data.forEach(entry => {
                        const dayName = getDayName(entry.hari_dalam_minggu); // Use the day name directly from API data
                        if (daysOfWeek[dayName] !== undefined) {
                            daysOfWeek[dayName] += 1; // Or increment based on the actual value from the entry
                        }
                    });

                    const totalHistoryArray = Object.values(daysOfWeek);
                    const totalSewa = totalHistoryArray.reduce((acc, cur) => acc + cur, 0);

                    setTotalHistory(totalSewa);

                    // Update chart data
                    setChartData(prevState => ({
                        ...prevState,
                        series: [
                            {
                                ...prevState.series[0],
                                data: totalHistoryArray,
                            },
                        ],
                        options: {
                            ...prevState.options,
                            xaxis: {
                                ...prevState.options.xaxis,
                                categories: ["Senin", "Selasa", "Rabu", "Kamis", "Jum`at", "Sabtu", "Minggu"],
                            },
                        },
                    }));
                } else if (filter === '4_minggu') {
                    // Initialize an array for weeks with zero values
                    const weeks = [0, 0, 0, 0];

                    // Aggregate data from API response
                    fetchData.data.forEach(entry => {
                        const weekNumber = entry.minggu_dalam_bulan;
                        if (weeks[weekNumber - 1] !== undefined) {
                            weeks[weekNumber - 1] += 1;
                        }
                    });

                    const totalSewa = weeks.reduce((acc, cur) => acc + cur, 0);

                    setTotalHistory(totalSewa);

                    // Update chart data
                    setChartData(prevState => ({
                        ...prevState,
                        series: [
                            {
                                ...prevState.series[0],
                                data: weeks,
                            },
                        ],
                        options: {
                            ...prevState.options,
                            xaxis: {
                                ...prevState.options.xaxis,
                                categories: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
                            },
                        },
                    }));
                } else if (filter === '6_bulan') {
                    // Initialize an array for months with zero values
                    const months = {
                        "Jan": 0,
                        "Feb": 0,
                        "Mar": 0,
                        "Apr": 0,
                        "May": 0,
                        "June": 0,
                    };

                    // Aggregate data from API response
                    fetchData.data.forEach(entry => {
                        const monthName = getMonthName(entry.bulan);
                        if (months[monthName] !== undefined) {
                            months[monthName] += 1;
                        }
                    });

                    const totalHistoryArray = Object.values(months);
                    const totalSewa = totalHistoryArray.reduce((acc, cur) => acc + cur, 0);

                    setTotalHistory(totalSewa);

                    // Update chart data
                    setChartData(prevState => ({
                        ...prevState,
                        series: [
                            {
                                ...prevState.series[0],
                                data: totalHistoryArray,
                            },
                        ],
                        options: {
                            ...prevState.options,
                            xaxis: {
                                ...prevState.options.xaxis,
                                categories: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
                            },
                        },
                    }));
                } else if (filter === '5_tahun') {
                    const years = {};
                    const currentYear = new Date().getFullYear();

                    // Initialize years
                    for (let i = 0; i < 5; i++) {
                        years[currentYear + i] = 0;
                    }

                    fetchData.data.forEach(entry => {
                        const year = entry.tahun;
                        if (years[year] !== undefined) {
                            years[year] += 1;
                        }
                    });

                    const totalHistoryArray = Object.values(years);
                    const totalSewa = totalHistoryArray.reduce((acc, cur) => acc + cur, 0);

                    setTotalHistory(totalSewa);

                    setChartData(prevState => ({
                        ...prevState,
                        series: [
                            {
                                ...prevState.series[0],
                                data: totalHistoryArray,
                            },
                        ],
                        options: {
                            ...prevState.options,
                            xaxis: {
                                ...prevState.options.xaxis,
                                categories: Object.keys(years),
                            },
                        },
                    }));
                    console.log(`Fetching data for ${filter}`);
                }
            } else {
                console.warn('No history data found');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const getDayName = (day) => {
        const days = {
            "Monday": "Senin",
            "Tuesday": "Selasa",
            "Wednesday": "Rabu",
            "Thursday": "Kamis",
            "Friday": "Jum`at",
            "Saturday": "Sabtu",
            "Sunday": "Minggu",
        };
        return days[day];
    };

    const getMonthName = (month) => {
        const months = {
            "Jan": "Jan",
            "Feb": "Feb",
            "Mar": "Mar",
            "Apr": "Apr",
            "May": "May",
            "June": "June",
        };
        return months[month];
    };

    useEffect(() => {
        fetchData('7_hari'); // Default fetch for 7 days
    }, []);

    const handleButtonClick = (buttonType) => {
        setActiveComponent(buttonType);

        switch (buttonType) {
            case 'chartDay':
                fetchData('7_hari');
                break;
            case 'chartWeek':
                fetchData('4_minggu');
                break;
            case 'chartMonth':
                fetchData('6_bulan');
                break;
            case 'chartYear':
                fetchData('5_tahun');
                break;
            default:
                break;
        }
    }

    const [position, setPosition] = React.useState("bottom");

    return (
        <Card>
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
                <div className="w-full flex flex-row justify-between items-start">
                    <div className="flex flex-col">
                        <Typography variant="h6" color="blue-gray">
                            Total Sewa
                        </Typography>
                        <Typography color="blue-gray" className="text-lg font-semibold pl-5">
                            {totalHistory}
                        </Typography>
                    </div>
                    <div className="md:hidden flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Kategori</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Kategori</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={activeComponent} onValueChange={handleButtonClick}>
                                    <DropdownMenuRadioItem value="chartDay">
                                        <Typography className={`text-sm ${activeComponent === 'chartDay' ? 'text-black' : 'text-[#6B7280]'}`}>
                                            7 Hari Terakhir
                                        </Typography>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="chartWeek">
                                        <Typography className={`text-sm ${activeComponent === 'chartWeek' ? 'text-black' : 'text-[#6B7280]'}`}>
                                            4 Minggu Terakhir
                                        </Typography>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="chartMonth">
                                        <Typography className={`text-sm ${activeComponent === 'chartMonth' ? 'text-black' : 'text-[#6B7280]'}`}>
                                            6 Bulan Terakhir
                                        </Typography>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="chartYear">
                                        <Typography className={`text-sm ${activeComponent === 'chartYear' ? 'text-black' : 'text-[#6B7280]'}`}>
                                            5 Tahun Terakhir
                                        </Typography>
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="md:flex hidden gap-5">
                        <button className={`cursor-pointer ${activeComponent === 'chartDay' ? 'text-black' : ''}`} onClick={() => handleButtonClick('chartDay')}>
                            <Typography className={`text-sm ${activeComponent !== 'chartDay' ? '' : ''}`}>
                                7 Hari Terakhir
                            </Typography>
                        </button>
                        <button className={`cursor-pointer ${activeComponent === 'chartWeek' ? 'text-black' : ''}`} onClick={() => handleButtonClick('chartWeek')}>
                            <Typography className={`text-sm ${activeComponent !== 'chartWeek' ? '' : ''}`}>
                                4 Minggu Terakhir
                            </Typography>
                        </button>
                        <button className={`cursor-pointer ${activeComponent === 'chartMonth' ? 'text-black' : ''}`} onClick={() => handleButtonClick('chartMonth')}>
                            <Typography className={`text-sm ${activeComponent !== 'chartMonth' ? '' : ''}`}>
                                6 Bulan Terakhir
                            </Typography>
                        </button>
                        <button className={`cursor-pointer ${activeComponent === 'chartYear' ? 'text-black' : ''}`} onClick={() => handleButtonClick('chartYear')}>
                            <Typography className={`text-sm ${activeComponent !== 'chartYear' ? '' : ''}`}>
                                5 Tahun Terakhir
                            </Typography>
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type={chartData.type}
                    height={chartData.height} />
            </CardBody>
        </Card>
    );
}

export default AllChart;