import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { WinnerContext } from "@/hooks/WinnerContext";

export function ClaimDialog({
  open,
  onClose,
  awardId,
  setWinner,
}: {
  open: boolean;
  onClose: () => void;
  awardId: number;
  setWinner: (data: null) => void;
}) {
  const [ticket, setTicket] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { fetchPrizes } = useContext(WinnerContext);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/codes/redeem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: ticket }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.msg || "Código inválido o ya usado."}`);
        return;
      }

      const assignRes = await fetch(`${API_URL}/awards/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          awardId: awardId,
          ticketNumber: data.used.ticket_number,
        }),
      });

      const assignData = await assignRes.json();

      if (assignRes.ok) {
        setMessage(`🎉 ¡Felicidades! Has ganado: ${assignData.award.name}`);
        setTimeout(() => onClose(), 2500);
      } else {
        setMessage(`⚠️ ${assignData.msg || "Error al asignar el premio."}`);
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
          <label
            htmlFor="ticket"
            className="text-lg text-muted-foreground mb-4 font-semibold"
          >
            Ingresa tu código o número de ticket:
          </label>
          <Input
            id="ticket"
            type="text"
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            placeholder="Ej: ABC12345"
            className="p-4"
            required
          />

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
