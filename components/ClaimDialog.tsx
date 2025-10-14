import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { WinnerContext } from "@/hooks/WinnerContext";

export function ClaimDialog({
  open,
  onClose,
  awardId,
  ticket,
  setWinner,
}: {
  open: boolean;
  onClose: () => void;
  awardId: number | null;
  ticket: string;
  setWinner: (data: null) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { fetchPrizes } = useContext(WinnerContext);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!awardId || !ticket) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/awards/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ awardId, ticketNumber: ticket }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`🎉 ¡Felicidades! Has ganado: ${data.award.name}`);
        setTimeout(() => onClose(), 2500);
      } else {
        setMessage(`⚠️ ${data.msg || "Error al asignar el premio."}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al conectar con el servidor.");
    } finally {
      fetchPrizes();
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        setWinner(null);
      }, 1500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-8 rounded-2xl backdrop-blur-md bg-background/90 border border-primary/40 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-4xl font-black mb-3 text-center">
            Reclamar Premio
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <p className="text-center text-lg font-semibold">
            Ticket: {ticket}
          </p>

          {message && (
            <p
              className={`text-center font-semibold ${
                message.startsWith("🎉") || message.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <DialogFooter className="flex justify-end mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="font-bold text-md"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="font-bold text-md"
            >
              {loading ? "Validando..." : "Reclamar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
