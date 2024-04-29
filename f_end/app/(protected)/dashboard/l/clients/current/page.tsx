"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios from "axios";
import { useEffect, useState } from "react";
import { ClientCard } from "../components/ClientCard";
import { ScrollBar } from "@/components/ui/scroll-area";

export default function CurrentClients() {
  const [clients, setClients] = useState([]);
  const [activeClients, setActiveClients] = useState();
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lawyer-dashboard-data`,
          {
            lawyerMail: localStorage.getItem("lawyerMail"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const reqFields = data.cases
          .filter((item: any) => item.stage !== "Closed")
          .map((item: any) => ({
            clientMail: item.clientMail,
            transactionAmount: item.transactionAmount,
            stage: item.stage,
          }));
        setClients(reqFields);
        setActiveClients(data.clientsCount);
      } catch (err) {
        console.log(err);
      }
    };
    fetchClients();
  }, []);
  return (
    <>
      <div className="grid lg:grid-cols-5">
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Current Clients
                </h2>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  <>
                    {activeClients && activeClients >= 1 ? (
                      clients.map((item: any, index) => (
                        <div key={index}>
                          <ClientCard
                            currCase={item}
                            clientMail={item.clientMail}
                          />
                        </div>
                      ))
                    ) : (
                      <p>No Active Clients</p>
                    )}
                  </>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4"></div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
