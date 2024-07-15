"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMouted] = useState(false);

  useEffect(() => {
    setMouted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme}>
      <TabsList className="  bg-foreground ">
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <SunIcon className=" h-[1.2rem] w-[1.2rem] dark:mix-blend-difference	" />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 dark:mix-blend-difference" />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={() => setTheme("system")}>
          <DesktopIcon className="h-[1.2rem] w-[1.2rem] dark:mix-blend-difference" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
