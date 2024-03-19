import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LawyerDialog } from "./LawyerDialog";

import { LawyerData } from "../types/Lawyers";

export function LawerCard(props: LawyerData) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{props.lname}</CardTitle>
        <CardDescription>Laywer Details</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <p id="name">{props.lname}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <p id="name">{props.email}</p>
            </div>
            <LawyerDialog
              lname={props.lname}
              email={props.email}
              specializations={props.specializations}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
