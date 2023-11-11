import { Button } from "@/components/ui/button";
import * as config from "@/lib/config";

import { ArrowRight, CodepenIcon } from "lucide-react";

const Branding = () => {
  return (
    <div className="text-center my-2 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <h1 className="underline font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
        {config.brand}
      </h1>
      <h2 className="text-3xl mt-5 sm:text-2xl md:text-3xl">
        AI Powered Legal Ecosystem.
      </h2>
      {/* <h4 className="my-4">Find out Lawyers, Help your Clients</h4> */}
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          "Revolutionary legal platform merging AI technology: a marketplace
          connecting clients & lawyers, comprehensive practice management tools,
          and cutting-edge AI-powered legal research, shaping the future of
          legal services."
        </p>
      </div>
      <Button>
        Explore
        <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default Branding;
