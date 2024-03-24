"use client";

import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav, UserNav } from "./_components";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { SelectedCase } from "./types/SelectedCase";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { RecentSales } from "./_components/landing";

export default function DashboardC() {
  const [lawyers, setLawyers] = useState([]);
  const [totalcases, setTotalCases] = useState(0);
  const [activeLawyers, setActiveLawyers] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client-dashboard-data`,
          {
            lawyerMail: localStorage.getItem("lawyerMail"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(data);

        const twoFields = data.cases
          .filter((item: any) => item.stage !== "Closed")
          .map((item: SelectedCase) => ({
            lawyerMail: item.lawyerMail,
            transactionAmount: item.transactionAmount,
          }));
        setLawyers(twoFields);
        setTotalAmount(data.totalAmount);
        setActiveLawyers(twoFields.length);
        setTotalCases(data.casesCount);
      } catch (err) {
        console.log(err);
      }
    };
    fetchClients();
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
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Spent
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{`₹${totalAmount}`}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Cases
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalcases}</div>
                      {/* <p className="text-xs text-muted-foreground">
                      +2 since last month
                    </p> */}
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Current Lawyers</CardTitle>
                      <CardDescription>
                        {activeLawyers} Active Lawyer(s)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {activeLawyers !== 0 &&
                        lawyers.map((item: any, index) => (
                          <RecentSales
                            key={index}
                            clientMail={item.lawyerMail}
                            transactionAmount={item.transactionAmount}
                          />
                        ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
