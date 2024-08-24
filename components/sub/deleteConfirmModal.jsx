import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, entityName }) {
    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader>Konfirmasi Hapus</DialogHeader>
            <DialogBody divider>
                Apakah Anda yakin ingin menghapus {entityName} ini? Tindakan ini tidak dapat diurungkan.
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={onClose}>
                    Batal
                </Button>
                <Button variant="gradient" color="blue" onClick={onConfirm}>
                    Hapus
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
