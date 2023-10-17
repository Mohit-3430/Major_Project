import { Button } from "@/components/ui/button";
import React from "react";

import { ArrowRight } from "lucide-react";

const Branding = () => {
  return (
    <div className="text-center my-8">
      <h1 className="underline text-3xl sm:text-3xl md:text-5xl my-3">AIPL</h1>
      <h2 className="text-3xl sm:text-2xl md:text-3xl">
        AI Powered Legal Ecosystem.
      </h2>
      <h4 className="my-4">Find out Lawyers, Help your Clients</h4>
      <Button>
        Explore
        <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default Branding;
