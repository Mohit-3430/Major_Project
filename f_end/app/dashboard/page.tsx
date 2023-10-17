"use client";
import { CopySlash } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const session = useSession();
  console.log(session.data?.user);
  return <div>Dashboard (Protected)</div>;
};

export default Dashboard;
