import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";

import Link from "next/link";
import { MainNav, UserNav } from "./_components";
import { ModeToggle } from "@/components/ui/toggle-theme";

export default function DashboardL() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <Button>
              <Link href="/dashboard/c/lawyers">
                Explore <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
