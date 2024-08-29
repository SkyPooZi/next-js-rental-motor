import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export default function CancelConfirmationModal({ isOpen, onClose, onSubmit }) {
    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader>Konfirmasi Batal</DialogHeader>
            <DialogBody divider>
                Apakah Anda yakin ingin membatalkan sewa motor ini? Tindakan ini tidak dapat diurungkan.
            </DialogBody>
            <DialogFooter className="flex gap-3">
                <Button variant="gradient" color="red" onClick={onClose}>
                    Tidak
                </Button>
                <Button variant="gradient" color="green" onClick={onSubmit}>
                    Iya
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
