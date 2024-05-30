"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loading-button";
import { Badge } from "@/components/ui/badge";

export default function LegalArea() {
  const [textareaValue, setTextareaValue] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classification`,
        {
          data: textareaValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let res = resp.data.result[0].generated_text;
      res = res.split("'")[1].trim();
      res = res
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char: String) => char.toUpperCase());
      setResult(res);
    } catch (err) {
      console.log(err);
      toast({
        title: "Model is loading",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Legal Area Identification</h2>
        </div>
        <Separator className="lg:min-w-[950px]" />
        <Tabs defaultValue="complete">
          <div className="container py-5">
            <div className="h-full items-stretch">
              <TabsContent value="complete" className="mt-0 border-0 p-0">
                <div className="flex h-full flex-col space-y-4">
                  <Textarea
                    placeholder="Enter the text to identify Legal Area"
                    className="min-h-[400px] p-4 md:min-h-[500px] md:min-w-[620px] lg:min-h-[500px] lg:min-w-[950px] overflow-y-auto text-justify"
                    value={textareaValue}
                    onChange={handleTextareaChange}
                  />
                  <div className="flex items-center space-x-2">
                    <LoadingButton loading={loading} onClick={handleSubmit}>
                      Submit
                    </LoadingButton>
                  </div>
                </div>
              </TabsContent>
              {result && (
                <>
                  <div className="mt-3">
                    Legal Area Analyzed:
                    <Badge variant="outline">{result}</Badge>
                  </div>
                </>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
