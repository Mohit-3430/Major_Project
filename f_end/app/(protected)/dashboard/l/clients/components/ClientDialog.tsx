import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function ClientDialog(props: any) {
  console.log(props.currCase);

  const { toast } = useToast();

  const handleSubmit = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">More Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>More Details</DialogTitle>
          <DialogDescription>Case and Client Details</DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4"> */}
        <div className="items-center">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <p>{props.clientName}</p>
        </div>
        <div className="items-center">
          <Label htmlFor="username" className="text-right">
            Email
          </Label>
          <p>{props.currCase.clientMail}</p>
        </div>
        <div className="items-center">
          <Label htmlFor="username" className="text-right">
            Transaction
          </Label>
          <p>{`₹${props.currCase.transactionAmount}`}</p>
        </div>
        <div className="items-center">
          <Label htmlFor="username" className="text-right">
            Stage
          </Label>
          <p>{props.currCase.stage}</p>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleSubmit()}>
            Update Stage
          </Button>
          <Button type="submit" onClick={() => handleSubmit()}>
            Close Case
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
