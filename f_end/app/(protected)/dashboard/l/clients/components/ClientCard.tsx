import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { ClientDialog } from "./ClientDialog";
import { useState } from "react";
import axios from "axios";
import { Progress } from "@/components/ui/progress";

type ProgressValue = {
  [key: string]: number;
};

export function ClientCard(props: any) {
  const [name, setName] = useState();
  const stage = props.currCase.stage;

  const progressValue: ProgressValue = {
    "Started": 25,
    "Trail": 50,
    "Judgement": 75,
    "Closed": 100,
  };

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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Client Details</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <p id="name">{name}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <p id="name">{props.clientMail}</p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Progress value={progressValue[stage]} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ClientDialog clientName={name} currCase={props.currCase} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
