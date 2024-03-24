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
import { LawyerData } from "../types/Lawyers";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { lawSpecializations } from "../../util/Areas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function LawyerDialog(props: LawyerData) {
  const session = useSession();
  const clientMail: String = session.data?.user?.email || "";
  const lawyerMail: String = props.email;
  const consultancyCost: Number = props.consultancyCost;
  const [caseArea, setCaseArea] = useState<string>("");
  const { specializations } = props;

  const { toast } = useToast();
  const handleSelectChange = (value: any) => {
    setCaseArea(value);
  };
  const handleSubmit = () => {
    if (caseArea !== "") {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-case`,
          {
            clientMail: clientMail,
            lawyerMail: lawyerMail,
            caseArea: caseArea,
            consultancyCost: consultancyCost,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((resp) => {
          if (resp.status == 201) {
            toast({
              title: "Confirmed!",
            });
          }
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Already Consulted!",
          });
        });
    } else {
      toast({
        variant: "destructive",
        title: "Select Case Area",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">More Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Lawyer Details and price</DialogDescription>
        </DialogHeader>
        <div className="items-center">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <p>{props.lname}</p>
        </div>
        <div className="items-center">
          <Label htmlFor="username" className="text-right">
            Email
          </Label>
          <p>{lawyerMail}</p>
        </div>
        <div className="items-center">
          <Label htmlFor="username" className="text-right">
            Consultancy Cost
          </Label>
          <p>{`₹${consultancyCost}`}</p>
        </div>
        <div className="items-center">
          <Label htmlFor="username" className="text-right">
            Specializations
          </Label>
          {specializations.map((sp: any, index) => (
            <p key={index}>{lawSpecializations[sp]}</p>
          ))}
        </div>
        <div className="items-center">
          <Select onValueChange={handleSelectChange}>
            <Label htmlFor="username" className="text-right">
              Legal Area
            </Label>
            <SelectTrigger className="w-[180px] mt-2">
              <SelectValue placeholder="Select a Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {specializations.map((sp: any, index) => (
                  <SelectItem key={index} value={sp}>
                    {lawSpecializations[sp]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* </div> */}
        <DialogFooter>
          <Button type="submit" onClick={() => handleSubmit()}>
            Consult
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
