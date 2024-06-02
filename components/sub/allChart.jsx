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
    const [totalHistory, setTotalHistory] = useState(0);
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
                show: "",
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

    const fetchData = async () => {
        try {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/api/history/all`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer 4|2HIQ8LZ6GMNPOa2rn0FxNlmzrr5m4elubwd2OsLx055ea188`
                }
            });

            const responseText = await response.text();
            console.log('Response Text:', responseText);

            const data = JSON.parse(responseText);
            console.log('Parsed JSON Data:', data);

            setHistory(data.history || []);

            const totalHistory = data.history?.length || 0;
            setTotalHistory(totalHistory);

            // Update chart data
            setChartData(prevState => ({
                ...prevState,
                series: [
                    {
                        ...prevState.series[0],
                        data: [totalHistory],
                    },
                ],
            }));
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [activeComponent, setActiveComponent] = useState('chartDay');

    const handleButtonClick = (buttonType) => {
        setActiveComponent(buttonType);

        switch (buttonType) {
            case 'chartDay':
                setChartData({
                    type: 'line',
                    height: 240,
                    series: [
                        {
                            name: "Total Sewa",
                            data: [50, 40, 300, 320, 500, 350, 200],
                        },
                    ],
                    options: {
                        ...chartData.options,
                        xaxis: {
                            ...chartData.options.xaxis,
                            categories: ["Senin", "Selasa", "Rabu", "Kamis", "Jum`at", "Sabtu", "Minggu"],
                        },
                    },
                });
                break;
            case 'chartWeek':
                setChartData({
                    type: 'line',
                    height: 240,
                    series: [
                        {
                            name: "Total Sewa",
                            data: [100, 200, 150, 300, 250],
                        },
                    ],
                    options: {
                        ...chartData.options,
                        xaxis: {
                            ...chartData.options.xaxis,
                            categories: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", "Minggu 5"],
                        },
                    },
                });
                break;
            case 'chartMonth':
                setChartData({
                    type: 'line',
                    height: 240,
                    series: [
                        {
                            name: "Total Sewa",
                            data: [200, 300, 400, 500, 300, 240, 220],
                        },
                    ],
                    options: {
                        ...chartData.options,
                        xaxis: {
                            ...chartData.options.xaxis,
                            categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Juni", "Juli", "Agt", "Sep", "Nov", "Des"],
                        },
                    },
                });
                break;
            case 'chartYear':
                setChartData({
                    type: 'line',
                    height: 240,
                    series: [
                        {
                            name: "Total Sewa",
                            data: [200, 300],
                        },
                    ],
                    options: {
                        ...chartData.options,
                        xaxis: {
                            ...chartData.options.xaxis,
                            categories: ["2024", "2025"],
                        },
                    },
                });
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
                                <DropdownMenuLabel>Pilih Kategori</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                    <button className={`cursor-pointer ${position === 'chartDay' ? 'text-black' : ''}`} onClick={() => setPosition('chartDay')}>
                                        <Typography className={`text-sm ${position !== 'chartDay' ? '' : ''}`}>
                                            7 Hari Terakhir
                                        </Typography>
                                    </button>
                                    <button className={`cursor-pointer ${position === 'chartWeek' ? 'text-black' : ''}`} onClick={() => setPosition('chartWeek')}>
                                        <Typography className={`text-sm ${position !== 'chartWeek' ? '' : ''}`}>
                                            4 Minggu Terakhir
                                        </Typography>
                                    </button>
                                    <button className={`cursor-pointer ${position === 'chartMonth' ? 'text-black' : ''}`} onClick={() => setPosition('chartMonth')}>
                                        <Typography className={`text-sm ${position !== 'chartMonth' ? '' : ''}`}>
                                            6 Bulan Terakhir
                                        </Typography>
                                    </button>
                                    <button className={`cursor-pointer ${position === 'chartYear' ? 'text-black' : ''}`} onClick={() => setPosition('chartYear')}>
                                        <Typography className={`text-sm ${position !== 'chartYear' ? '' : ''}`}>
                                            5 Tahun Terakhir
                                        </Typography>
                                    </button>
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