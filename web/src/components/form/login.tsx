import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { login } from "@/types/signin";
import { LoginService } from "@/services/public";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Spinner from "@/assets/icons/spinner.svg?react";
import { H3 } from "../typography/h3";

export default function LoginForm({ type }: { type: "client" | "restaurant" | "admin" }) {
  const navigate = useNavigate({ from: "/signin" });
  const form = useForm<z.infer<typeof login>>({
    resolver: zodResolver(login),
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const { mutate, data, isError, error, status } = useMutation({ mutationFn: LoginService });

  useEffect(() => {
    if (status === "success") {
      localStorage.setItem("jwtToken", data.data);
      toast(data.message);
      navigate({ to: `/${type}` });
    }

    if (isError) {
      console.log(error);
    }
  }, [status, data, isError, error, navigate, type]);

  function onSubmit(values: z.infer<typeof login>) {
    mutate({ ...values, type });

    form.reset();
  }

  return (
    <>
      <H3>{type.charAt(0).toUpperCase() + type.slice(1)}</H3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
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
          <Button type="submit" className="ml-5">
            {status === "pending" ? <Spinner /> : "Send"}
          </Button>
        </form>
      </Form>
    </>
  );
}
