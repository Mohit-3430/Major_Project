"use client";

import React from "react";
import { ModeToggle } from "../ui/toggle-theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import * as config from "@/lib/config";

const AuthNavbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-row justify-around items-center font-medium">
      <div>
        <Link href="/dashboard">
          <span className="text-2xl font-bold">{config.brand}</span>
        </Link>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div>
          <Button
            variant="link"
            onClick={() =>
              signOut({ callbackUrl: "http://localhost:3000/login" })
            }
          >
            Logout
          </Button>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
