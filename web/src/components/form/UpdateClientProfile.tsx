import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { UpdateClientProfile } from "@/types/update";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Spinner from "@/assets/icons/spinner.svg?react";
import { H3 } from "../typography/h3";
import { UpdateClientProfileService } from "@/services/client";
import { useNavigate } from "@tanstack/react-router";

export default function UpdateClientProfileForm() {
  const navigate = useNavigate({ from: "/client/profile/update" });
  const form = useForm<z.infer<typeof UpdateClientProfile>>({
    resolver: zodResolver(UpdateClientProfile),
    mode: "onSubmit",
    defaultValues: { email: "", name: "", password: "" },
  });

  const { mutate, data, isError, error, status } = useMutation({ mutationFn: UpdateClientProfileService });

  useEffect(() => {
    if (status === "success") {
      toast(data.message);
      navigate({ to: "/client/profile" });
    }

    if (isError) {
      console.log(error);
    }
  }, [status, data, isError, error, navigate]);

  function onSubmit(values: z.infer<typeof UpdateClientProfile>) {
    mutate(values);

    form.reset();
  }

  return (
    <div className="flex flex-col justify-center gap-y-20 px-5 w-full lg:px-20 lg:w-2/5">
      <H3>Modifier profil</H3>
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
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">{status === "pending" ? <Spinner /> : "Changer"}</Button>
        </form>
      </Form>
    </div>
  );
}
