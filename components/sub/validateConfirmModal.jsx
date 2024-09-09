import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export default function ValidateConfirmModal({ isOpen, onClose, onSubmit }) {
    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader>Konfirmasi</DialogHeader>
            <DialogBody divider>
                Apakah anda yakin data yang diisi sudah benar? <br />
                Pemilik Rental berhak membatalkan pesanan jika ada data diri yang tidak valid
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
