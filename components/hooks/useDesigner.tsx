"use client";

import { useContext } from "react";
import { DesignerContext } from "../context/DesignerContext";

export default function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("Erro no hook useDesigner");
  }
  return context;
}
