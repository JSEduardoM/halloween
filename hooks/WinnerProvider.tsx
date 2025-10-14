"use client";

import { useEffect, useState } from "react";
import { WinnerContext } from "./WinnerContext";

export const WinnerProvider = ({ children }: { children: React.ReactNode }) => {
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [prizes, setPrizes] = useState<any[]>([])

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchWinners = async () => {
    try {
      const res = await fetch(`${API_URL}/codes/winners`);
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      const data = await res.json();
      setWinners(data);
    } catch (error) {
      console.error("❌ Error al obtener ganadores:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrizes = async () =>{
    try {
      const res = await fetch(`${API_URL}/awards`);
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      const data = await res.json();
      console.log(data)
      setPrizes(data);
    } catch (error) {
      console.error("❌ Error al obtener ganadores:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPrizes()
    fetchWinners()
  }, []);

  return (
    <WinnerContext.Provider value={{ winners, prizes, fetchPrizes, loading, refresh: fetchWinners }}>
      {children}
    </WinnerContext.Provider>
  );
};
