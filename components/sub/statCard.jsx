import React from 'react';

const StatCard = ({ icon, title, value, color }) => {
    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white shadow-md">
            <div className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-${color}-600 to-${color}-400 text-white shadow-${color}-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}>
                {icon}
            </div>
            <div className="p-4 text-right">
                <p className="block mt-5 antialiased text-sm leading-normal font-medium">{title}</p>
                <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug">{value}</h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4"></div>
        </div>
    );
};

export default StatCard;
