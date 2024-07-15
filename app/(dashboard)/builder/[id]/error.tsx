"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { MdError } from "react-icons/md";

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error), [error];
  });

  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-6">
      <MdError className="w-32 h-32 text-destructive-foreground" />

      <h2 className=" text-4xl font-bold font-inter">Algo deu errado!</h2>
      <Button
        asChild
        className="bg-destructive-foreground text-primary hover:text-background"
      >
        <Link href={"/"}>Voltar à tela inicial</Link>
      </Button>
    </div>
  );
}
