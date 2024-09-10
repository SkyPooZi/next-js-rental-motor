import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export default function ConfirmMoneyModal({ isOpen, onClose, onSubmit, peran, nama_lengkap, total_biaya }) {
    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader>Konfirmasi</DialogHeader>
            <DialogBody divider>
                Apakah Anda Yakin?
                {/* Apakah Anda Yakin {nama_lengkap} Sudah Membayar Sebesar {total_biaya} */}
                {/* Apakah Anda Yakin Sudah Mengembalikan Sebesar Rp kepada user */}
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
