"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-primary bg-secondary">
      <Sun className="h-[14px] w-[14px] text-muted" strokeWidth={2} />
      <Switch checked={isDark} onCheckedChange={handleToggle} />
      <Moon className="h-[14px] w-[14px] text-muted" strokeWidth={2} />
    </div>
  );
}
