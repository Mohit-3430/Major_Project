"use client";
import { useSession } from "next-auth/react";
import * as config from "@/lib/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const session: any = useSession();
  const token = session.data?.user?.token;
  const mail = session.data?.user?.email;
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) localStorage.setItem("token", token);

  const usertype: string = session.data?.user.usertype;

  const render = () => {
    if (usertype == config.usertypes.LAWYER) {
      router.push("/dashboard/l");
      if (!ISSERVER) localStorage.setItem("lawyerMail", mail);
    } else {
      router.push("/dashboard/c");
      if (!ISSERVER) localStorage.setItem("clientMail", mail);
    }
  };

  setTimeout(render, 500);

  return null;
};

export default Dashboard;
