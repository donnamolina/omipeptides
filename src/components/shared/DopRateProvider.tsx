"use client";

import { useEffect } from "react";
import { setDopRate } from "@/store/cart";

export default function DopRateProvider({ rate }: { rate: number }) {
  setDopRate(rate); // set synchronously before first render
  useEffect(() => {
    setDopRate(rate);
  }, [rate]);
  return null;
}
