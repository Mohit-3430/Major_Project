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

export function LawyerDialog(props: LawyerData) {
  const session = useSession();
  const clientMail: String = session.data?.user?.email || "";
  const lawyerMail: String = props.email;
  const { specializations } = props;

  const { toast } = useToast();

  const handleSubmit = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-case`,
        { clientMail: clientMail, lawyerMail: lawyerMail },
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
          title: "Already Consulted!",
        });
      });
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
        {/* <div className="grid gap-4 py-4"> */}
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
            Specializations
          </Label>
          {specializations.map((sp, index) => (
            <p key={index}>{sp}</p>
          ))}
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
