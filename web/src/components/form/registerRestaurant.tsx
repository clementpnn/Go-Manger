import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { registerRestaurant } from "@/types/signin";
import { RegisterRestaurantService } from "@/services/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Spinner from "@/assets/icons/spinner.svg?react";
import { H3 } from "../typography/h3";

export default function RegisterRestaurantForm() {
  const form = useForm<z.infer<typeof registerRestaurant>>({
    resolver: zodResolver(registerRestaurant),
    mode: "onSubmit",
    defaultValues: { email: "", name: "", image: new File([], "") },
  });

  const { mutate, data, isError, error, status } = useMutation({ mutationFn: RegisterRestaurantService });

  useEffect(() => {
    if (status === "success") {
      toast(data.message);
    }

    if (isError) {
      console.log(error);
    }
  }, [status, data, isError, error]);

  function onSubmit(values: z.infer<typeof registerRestaurant>) {
    mutate(values);

    form.reset();
  }

  return (
    <>
      <H3>Register Restaurant</H3>
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    accept=".jpg, .jpeg, .png, .webp"
                    multiple={false}
                    type="file"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
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
