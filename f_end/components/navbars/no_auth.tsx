"use client";

import React from "react";
import { ModeToggle } from "../ui/toggle-theme";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import * as config from "@/lib/config";

const NoAuthNavbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-row justify-around items-center font-medium">
      <div>
        <Link href="/">
          <span className="text-2xl font-bold">{config.brand}</span>
        </Link>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div>
          <Link
            href="/login"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/login")
                ? "text-foreground"
                : "text-foreground/60",
              "px-3"
            )}
          >
            Login
          </Link>
        </div>
        <div>
          <Link
            href="/register"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/register")
                ? "text-foreground"
                : "text-foreground/60",
              "px-3"
            )}
          >
            Register
          </Link>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NoAuthNavbar;
