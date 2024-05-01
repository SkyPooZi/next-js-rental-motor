import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { addDays, format } from "date-fns";

import { CalendarIcon } from "@radix-ui/react-icons";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";

import { cn } from "@/lib/utils";

const RescheduleModal = ({ isOpen, onClose, className }) => {
    const currentDate = new Date();

    const [date, setDate] = useState({
        from: currentDate,
        to: addDays(currentDate, 1),
    });

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className='w-full flex flex-col gap-5'>
                    <Label>
                        <span className='font-semibold text-base'>
                            Penjadwalan Ulang
                        </span>
                    </Label>
                    <div className='flex flex-row gap-2'>
                        <Image src='/images/motor/dummy.png' alt='motor' width={70} height={0} />
                        <div className="flex flex-col gap-1">
                            <Label>
                                <span className="text-base">
                                    Motor
                                </span>
                            </Label>
                            <Label>
                                <span className="text-base">
                                    08-03-2024 - 09-03-2024
                                </span>
                            </Label>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-5'>
                        <div className={cn("grid", className)}>
                            <span className='text-black'>Tanggal Mulai</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "w-[368px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, "LLL dd, y")} -{" "}
                                                    {format(date.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pilih</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className='flex flex-row gap-5 '>
                        <div className='text-black'>
                            Durasi
                            <Select disabled>
                                <SelectTrigger className='w-[368px]'>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem className='hover:bg-accent' value="matic">
                                            <span>Matic</span>
                                        </SelectItem>
                                        <SelectItem className='hover:bg-accent' value="manual">
                                            <span>Manual</span>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button className='cursor-pointer'>
                        <Label>
                            <span className='cursor-pointer'>
                                Simpan
                            </span>
                        </Label>
                    </Button>
                </div>
                {/* <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    Close
                </button> */}
            </div>
        </div>
    );
};

export default RescheduleModal;
