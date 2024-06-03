import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const PopupDelete = ({ motorId, onConfirm, onCancel }) => {
    return (
        <div className="fixed z-50 flex flex-col gap-2 items-center bg-[#F6F7F9] px-4 py-4 rounded-md shadow-lg" role="alert">
            <span>Apakah anda yakin ingin menghapus motor ini?</span>
            <div className="w-full flex flex-row justify-end gap-4">
                <Button color="red" onClick={onCancel}>Batal</Button>
                <Button color="green" onClick={() => onConfirm(motorId)}>Konfirmasi</Button>
            </div>
        </div>
    );
};

export default PopupDelete;