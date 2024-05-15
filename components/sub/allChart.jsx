import React, { useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

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
    const [chartData, setChartData] = useState({
        type: 'line',
        height: 240,
        series: [
            {
                name: "Total Sewa",
                data: [50, 40, 300, 320, 500, 350, 200],
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
                            8
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
                                    <DropdownMenuRadioItem value="all">
                                        <button className={`cursor-pointer ${activeComponent === 'chartDay' ? 'text-black' : ''}`} onClick={() => handleButtonClick('chartDay')}>
                                            <Typography className={`text-sm ${activeComponent !== 'chartDay' ? '' : ''}`}>
                                                7 Hari Terakhir
                                            </Typography>
                                        </button>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="paymentWait">
                                        <button className={`cursor-pointer ${activeComponent === 'chartWeek' ? 'text-black' : ''}`} onClick={() => handleButtonClick('chartWeek')}>
                                            <Typography className={`text-sm ${activeComponent !== 'chartWeek' ? '' : ''}`}>
                                                4 Minggu Terakhir
                                            </Typography>
                                        </button>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="inOrder">
                                        <button className={`cursor-pointer ${activeComponent === 'chartMonth' ? 'text-black' : ''}`} onClick={() => handleButtonClick('chartMonth')}>
                                            <Typography className={`text-sm ${activeComponent !== 'chartMonth' ? '' : ''}`}>
                                                6 Bulan Terakhir
                                            </Typography>
                                        </button>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="inUse">
                                        <button className={`cursor-pointer ${activeComponent === 'chartYear' ? 'text-black' : ''}`} onClick={() => handleButtonClick('chartYear')}>
                                            <Typography className={`text-sm ${activeComponent !== 'chartYear' ? '' : ''}`}>
                                                5 Tahun Terakhir
                                            </Typography>
                                        </button>
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
                <Chart {...chartData} />
            </CardBody>
        </Card>
    );
}

export default AllChart;
