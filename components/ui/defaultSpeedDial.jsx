import React, { useState } from 'react';

import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Typography,
} from "@material-tailwind/react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHistory, AiOutlineDollarCircle } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FiInfo } from "react-icons/fi";
import {
    PlusIcon,
} from "@heroicons/react/24/outline";

import Profile from "@/components/sub/profile";
import Point from "@/components/sub/point";
import History from "@/components/sub/history";
import Terms from "@/components/sub/terms";

export function DefaultSpeedDial({ activeComponent, handleButtonClick }) {

    return (
        <div className="relative h-80 w-full">
            <div className="absolute bottom-0 right-0">
                <SpeedDial>
                    <SpeedDialHandler>
                        <IconButton size="lg" className="rounded-full bg-[#FF4D33]">
                            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                        </IconButton>
                    </SpeedDialHandler>
                    <SpeedDialContent>
                        <SpeedDialAction className={`h-16 w-16 ${activeComponent === 'profile' ? 'bg-[#FF4D30] text-white' : ''}`} onClick={() => handleButtonClick('profile')}>
                            <CgProfile className="h-5 w-5" />
                            <Typography color="blue-gray" className={`text-xs font-normal ${activeComponent === 'profile' ? 'text-white' : ''}`}>
                                Profil
                            </Typography>
                        </SpeedDialAction>
                        <SpeedDialAction className={`h-16 w-16 ${activeComponent === 'point' ? 'bg-[#FF4D30] text-white' : ''}`} onClick={() => handleButtonClick('point')}>
                            <AiOutlineDollarCircle className="h-5 w-5" />
                            <Typography color="blue-gray" className={`text-xs font-normal ${activeComponent === 'point' ? 'text-white' : ''}`}>
                                Poin
                            </Typography>
                        </SpeedDialAction>
                        <SpeedDialAction className={`h-16 w-16 ${activeComponent === 'history' ? 'bg-[#FF4D30] text-white' : ''}`} onClick={() => handleButtonClick('history')}>
                            <AiOutlineHistory className="h-5 w-5" />
                            <Typography color="blue-gray" className={`text-xs font-normal ${activeComponent === 'history' ? 'text-white' : ''}`}>
                                Riwayat
                            </Typography>
                        </SpeedDialAction>
                        <SpeedDialAction className={`h-16 w-16 ${activeComponent === 'terms' ? 'bg-[#FF4D30] text-white' : ''}`} onClick={() => handleButtonClick('terms')}>
                            <FiInfo className="h-5 w-5" />
                            <Typography color="blue-gray" className={`text-xs font-normal ${activeComponent === 'terms' ? 'text-white' : ''}`}>
                                Kebijakan
                            </Typography>
                        </SpeedDialAction>
                        <SpeedDialAction className='h-16 w-16'>
                            <RiLogoutCircleLine className="h-5 w-5 text-[#FF4D33]" />
                            <Typography color="blue-gray" className="text-xs text-[#FF4D33] font-normal">
                                Logout
                            </Typography>
                        </SpeedDialAction>
                    </SpeedDialContent>
                </SpeedDial>
            </div>
        </div>
    );
}