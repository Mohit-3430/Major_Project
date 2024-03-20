"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SelectedCase } from "../../types/SelectedCase";
import axios from "axios";
import { useState } from "react";

export function RecentSales(props: SelectedCase) {
  const [name, setName] = useState<String>();
  axios
    .post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-client-info`,
      {
        clientMail: props.clientMail,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((resp) => {
      setName(resp.data.client.name);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="space-y-8 mt-2">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-sm text-muted-foreground">{props.clientMail}</p>
        </div>
        <div className="ml-auto font-medium">{`+₹${props.transactionAmount}`}</div>
      </div>
    </div>
  );
}
