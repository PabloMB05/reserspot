import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export function AlertModal({ open, onClose, message }: AlertModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-center space-y-4">
        <DialogHeader>
          <DialogTitle>Atención</DialogTitle>
        </DialogHeader>
        <p className="text-sm">{message}</p>
        <Button onClick={onClose} className="mx-auto mt-2">Aceptar</Button>
      </DialogContent>
    </Dialog>
  );
}
