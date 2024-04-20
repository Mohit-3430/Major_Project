import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Summarization() {
  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Legal Text Summarization</h2>
        </div>
        <Separator />
        <Tabs defaultValue="complete">
          <div className="container py-5">
            <div className="h-full items-stretch">
              <TabsContent value="complete" className="mt-0 border-0 p-0">
                <div className="flex h-full flex-col space-y-4">
                  <Textarea
                    placeholder="Enter the text to summarize"
                    className="min-h-[400px] p-4 md:min-h-[500px] md:min-w-[700px] lg:min-h-[500px] lg:min-w-[700px] overflow-y-auto text-justify"
                  />
                  <div className="flex items-center space-x-2">
                    <Button>Submit</Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
