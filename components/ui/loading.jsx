import React from 'react';
import { Spinner } from '@material-tailwind/react';

const Loading = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
        <Spinner color="blue" size="xl" />
    </div>
);

export default Loading;
