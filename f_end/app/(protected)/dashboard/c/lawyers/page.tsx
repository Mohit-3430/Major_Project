"use client";

import { MainNav, UserNav } from "../_components";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";
import axios from "axios";
import { LawerCard } from "./components/LawyerCard";

export default function DashboardL() {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fetch-lawyers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLawyers(resp.data.data);
    };
    fetchLawyers();
  }, []);

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
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Active Lawyers
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Top Lawyers Available. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                        <>
                          {lawyers.map((item: any) => (
                            <div key={item.email}>
                              <LawerCard
                                lname={item.name}
                                email={item.email}
                                consultancyCost={item.consultancyCost}
                                specializations={item.specializations}
                              />
                            </div>
                          ))}
                        </>
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                  {/* <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Lawyers for you
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your personalized lawyers. Updated daily.
                    </p>
                  </div>
                  <Separator className="my-4" /> */}
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4"></div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
