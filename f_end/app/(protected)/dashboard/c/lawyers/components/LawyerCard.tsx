import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function LawerCard({ lname, email }: { lname: any; email: any }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{lname}</CardTitle>
        <CardDescription>Laywer Details</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <p id="name">{lname}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <p id="name">{email}</p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>More Details</Button>
      </CardFooter>
    </Card>
  );
}
