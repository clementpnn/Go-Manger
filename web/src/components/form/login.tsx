import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { login } from "@/types/signin";
import { LoginService } from "@/services/public";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Spinner from "@/assets/icons/spinner.svg?react";

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
    <div className="flex flex-col justify-center gap-y-20 px-5 w-full lg:px-20 lg:w-2/5">
      <div className="header-1 flex flex-row gap-x-4">
        <span>Go</span>
        <span className="text-primary">Manger</span>
      </div>
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
                    <Input {...field} placeholder="Entrez votre email" />
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
                    <Input {...field} placeholder="Entrez votre mot de passe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Button type="submit">{status === "pending" ? <Spinner /> : "Se connecter"}</Button>
            {type === "client" && (
              <Link to="/registerClient">
                <Button variant={"link"} className="text-primary w-full">
                  Pas de compte ? Vous identifiez
                </Button>
              </Link>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
