"use client";
import { useSession } from "next-auth/react";
import * as config from "@/lib/config";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const session: any = useSession();
  const token = session.data?.user?.token;
  localStorage.setItem("token", token);

  const usertype: string = session.data?.user.usertype;

  const render = () => {
    if (usertype == config.usertypes.LAWYER) {
      router.push("/dashboard/l");
    } else {
      router.push("/dashboard/c");
    }
  };

  setTimeout(render, 500);

  return null;
};

export default Dashboard;
