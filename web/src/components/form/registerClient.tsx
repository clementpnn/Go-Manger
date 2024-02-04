import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { registerClient } from "@/types/signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Spinner from "@/assets/icons/spinner.svg?react";
import { H3 } from "../typography/h3";
import { RegisterClientService } from "@/services/client";
import { Link } from "@tanstack/react-router";

export default function RegisterClientForm() {
  const form = useForm<z.infer<typeof registerClient>>({
    resolver: zodResolver(registerClient),
    mode: "onSubmit",
    defaultValues: { email: "", name: "", password: "" },
  });

  const { mutate, data, isError, error, status } = useMutation({ mutationFn: RegisterClientService });

  useEffect(() => {
    if (status === "success") {
      toast(data.message);
    }

    if (isError) {
      console.log(error);
    }
  }, [status, data, isError, error]);

  function onSubmit(values: z.infer<typeof registerClient>) {
    mutate(values);

    form.reset();
  }

  return (
    <div className="flex flex-col justify-center gap-y-20 px-20 w-2/5">
      <H3>Register Client</H3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-[3.75rem]">
          <div className="flex flex-col gap-y-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Button type="submit">{status === "pending" ? <Spinner /> : "S'identifier"}</Button>
            <Link to="/loginClient">
              <Button variant={"link"} className="text-primary w-full">
                Vous avez déja un compte ? Vous connectez
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}