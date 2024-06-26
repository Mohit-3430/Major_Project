"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { registerSchema } from "./RegisterSchema";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const RegisterForm = () => {
  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
  const [ustype, setUstype] = useState("");
  const { toast } = useToast();

  const OPTIONS: Option[] = [
    {
      value: "Banking_and_Finance_Law",
      label: "Banking and Finance Law",
    },
    {
      value: "Civil_Litigation_and_Dispute_Law",
      label: "Civil Litigation and Dispute Law",
    },
    {
      value: "Corporate_Law",
      label: "Corporate Law",
    },
    {
      value: "Constitutional_Law",
      label: "Constitutional Law",
    },
    {
      value: "Consumer_Protection_Law",
      label: "Consumer Protection Law",
    },
    {
      value: "Criminal_Law",
      label: "Criminal Law",
    },
    {
      value: "Family_Law",
      label: "Family Law",
    },
    {
      value: "Human_Rights_Law",
      label: "Human Rights Law",
    },
    {
      value: "Intellectual_Property_Law",
      label: "Intellectual Property Law",
    },
    {
      value: "Property_Law",
      label: "Property Law",
    },
    {
      value: "Tax_Law",
      label: "Tax Law",
    },
  ];

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    // default values are required to prevent react warning
    //Warning: A component is changing an uncontrolled input to be controlled.
    defaultValues: {
      email: "",
      name: "",
      age: 0,
      usertype: undefined,
      specializations: [],
      consultancyCost: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    // validation
    form.trigger(["confirmPassword", "password"]);
    const pswd = form.getFieldState("password");
    const cpswd = form.getFieldState("confirmPassword");

    if (!pswd.isDirty || pswd.invalid) return;
    if (!cpswd.isDirty || cpswd.invalid) return;

    //sending data
    const {
      email,
      name,
      age,
      usertype,
      password,
      confirmPassword,
      specializations,
      consultancyCost,
    } = values;

    const specs: Array<String> = values.specializations.map(
      (option) => option.value
    );
    if (password != confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords not Matched!",
      });
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          age: age,
          usertype: usertype,
          specializations: specs,
          consultancyCost: Number(consultancyCost),
          password: password,
        }),
      }
    );
    const finalResp = await res.json();
    if (res?.status == 201) {
      toast({
        title: "Registered!",
      });
      router.push("/login");
    } else if (res?.status == 409) {
      toast({
        variant: "destructive",
        title: "Email already exists",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error Registering!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Explore the Services</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-3 overflow-x-hidden"
            >
              <motion.div
                className={cn("space-y-3", {
                  // hidden: formStep == 1,
                })}
                // formStep == 0 -> translateX == 0
                // formStep == 1 -> translateX == '-100%'
                animate={{
                  translateX: `-${formStep * 100}%`,
                }}
                transition={{
                  ease: "easeInOut",
                }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter valid email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Age"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usertype"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>What are you</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Lawyer" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Lawyer
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Client" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Client
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                className={cn("space-y-3 absolute top-0 left-0 right-0", {})}
                animate={{
                  translateX: `${100 - formStep * 100}%`,
                }}
                style={{
                  translateX: `${100 - formStep * 100}%`,
                }}
                transition={{
                  ease: "linear",
                }}
              >
                {ustype === "Lawyer" && (
                  <>
                    <div className="mt-[-25px]">
                      <FormField
                        control={form.control}
                        name="specializations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Legal Areas</FormLabel>
                            <FormControl>
                              <MultipleSelector
                                maxSelected={3}
                                onMaxSelected={(maxLimit) => {
                                  toast({
                                    title: `You have reached max selected: ${maxLimit}`,
                                  });
                                }}
                                value={field.value}
                                onChange={field.onChange}
                                defaultOptions={OPTIONS}
                                placeholder="Select Upto 3 Areas"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="consultancyCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Consultancy Cost</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter charges" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="retype password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <div className="flex gap-2">
                <div className="mt-10">
                  <Button
                    type="submit"
                    className={cn({
                      hidden: formStep == 0,
                    })}
                  >
                    Submit
                  </Button>
                </div>
                <Button
                  type="button"
                  variant={"ghost"}
                  className={cn({
                    hidden: formStep == 1,
                  })}
                  onClick={() => {
                    // validation
                    form.trigger(["email", "name", "age", "usertype"]);
                    const emailState = form.getFieldState("email");
                    const nameState = form.getFieldState("name");
                    const age = form.getFieldState("age");
                    const utype = form.getFieldState("usertype");
                    setUstype(form.getValues("usertype"));

                    if (!emailState.isDirty || emailState.invalid) return;
                    if (!nameState.isDirty || nameState.invalid) return;
                    if (!age.isDirty || age.invalid) return;
                    if (!utype.isDirty || utype.invalid) return;

                    setFormStep(1);
                  }}
                >
                  Next Step
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
                <div className="mt-10">
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => {
                      setFormStep(0);
                    }}
                    className={cn({
                      hidden: formStep == 0,
                    })}
                  >
                    Go Back
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
