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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function ClientDialog(props: any) {
  const { toast } = useToast();
  const [stage, setStage] = useState<String>(props.currCase.stage);
  const handleSelectChange = (value: String) => {
    setStage(value);
  };

  const reOpen = () => {
    setStage("Started");
    updateStage();
  };

  const updateStage = () => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-case-stage`,
        {
          clientMail: props.currCase.clientMail,
          lawyerMail: localStorage.getItem("lawyerMail"),
          stage: stage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        if (resp.status == 200) {
          toast({
            title: "Updated!",
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Couldn't Update!",
        });
      });
  };

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
        {props.currCase.stage !== "Closed" && (
          <>
            <div className="items-center">
              <Label htmlFor="username" className="text-right">
                Stage
              </Label>
              <p>{stage}</p>
            </div>
            <div>
              <Select onValueChange={handleSelectChange}>
                <Label htmlFor="username" className="text-right">
                  Change Stage
                </Label>
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="Update Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Started">Started</SelectItem>
                    <SelectItem value="Trail">Trail</SelectItem>
                    <SelectItem value="Judgement">Judgement</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => updateStage()}>
                Update Stage
              </Button>
              {/* <Button type="submit" onClick={() => handleSubmit()}>
            Close Case
          </Button> */}
            </DialogFooter>
          </>
        )}
        {props.currCase.stage === "Closed" && (
          <Button type="submit" onClick={() => reOpen()}>
            Re-Open
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
