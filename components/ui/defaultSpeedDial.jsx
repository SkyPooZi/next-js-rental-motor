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

export function DefaultSpeedDial({ activeComponent, handleButtonClick }) {
    const [open, setOpen] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(<PlusIcon className="h-5 w-5" />);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const handleActionClick = (component, icon) => {
        handleButtonClick(component);
        setCurrentIcon(icon); // Update the current icon based on the selected action
        setOpen(false); // Close the SpeedDial after an action is clicked
    };

    return (
        <div className="relative h-80 w-full">
            <div className="absolute bottom-0 right-0">
                <SpeedDial open={open} onToggle={toggleOpen}>
                    <SpeedDialHandler>
                        <IconButton size="lg" className="rounded-full bg-[#FF4D33]" onClick={toggleOpen}>
                            <div className={`transition-transform ${open ? 'rotate-45' : ''}`}>
                                {currentIcon}
                            </div>
                        </IconButton>
                    </SpeedDialHandler>
                    <SpeedDialContent>
                        <SpeedDialAction
                            className={`h-16 w-16 ${activeComponent === 'profile' ? 'bg-[#FF4D30] text-white' : ''}`}
                            onClick={() => handleActionClick('profile', <CgProfile className="h-5 w-5" />)}
                        >
                            <CgProfile className="h-5 w-5" />
                            <Typography color="blue-gray" className={`text-xs font-normal ${activeComponent === 'profile' ? 'text-white' : ''}`}>
                                Profil
                            </Typography>
                        </SpeedDialAction>
                        <SpeedDialAction
                            className={`h-16 w-16 ${activeComponent === 'point' ? 'bg-[#FF4D30] text-white' : ''}`}
                            onClick={() => handleActionClick('point', <AiOutlineDollarCircle className="h-5 w-5" />)}
                        >
                            <AiOutlineDollarCircle className="h-5 w-5" />
                            <Typography color="blue-gray" className={`text-xs font-normal ${activeComponent === 'point' ? 'text-white' : ''}`}>
                                Poin
                            </Typography>
                        </SpeedDialAction>
                        <SpeedDialAction
                            className={`h-16 w-16 ${activeComponent === 'history' ? 'bg-[#FF4D30] text-white' : ''}`}
                            onClick={() => handleActionClick('history', <AiOutlineHistory className="h-5 w-5" />)}
                        >
                            <AiOutlineHistory className="h-5 w-5" />
                            <Typography color="blue-gray" className={`text-xs font-normal ${activeComponent === 'history' ? 'text-white' : ''}`}>
                                Riwayat
                            </Typography>
                        </SpeedDialAction>
                        <SpeedDialAction
                            className={`h-16 w-16 ${activeComponent === 'terms' ? 'bg-[#FF4D30] text-white' : ''}`}
                            onClick={() => handleActionClick('terms', <FiInfo className="h-5 w-5" />)}
                        >
                            <FiInfo className="h-5 w-5" />
                            <Typography color="blue-gray" className={`text-xs font-normal ${activeComponent === 'terms' ? 'text-white' : ''}`}>
                                Kebijakan
                            </Typography>
                        </SpeedDialAction>
                        <SpeedDialAction
                            className="h-16 w-16"
                            onClick={() => handleActionClick('logout', <RiLogoutCircleLine className="h-5 w-5 text-[#FF4D33]" />)}
                        >
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
