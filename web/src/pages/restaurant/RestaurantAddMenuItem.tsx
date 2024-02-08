import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Spinner from "@/assets/icons/spinner.svg?react";
import { H3 } from "@/components/typography/h3";
import { AddRestaurantMenuItem, MenuItemType } from "@/types/restaurant";
import { AddRestaurantMenuItemService } from "@/services/restaurant";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavbarRestaurateur from "@/components/navbar/navbarRestaurateur";
import { Textarea } from "@/components/ui/textarea";

export default function RestaurantAddMenuItem() {
  const form = useForm<z.infer<typeof AddRestaurantMenuItem>>({
    resolver: zodResolver(AddRestaurantMenuItem),
    mode: "onSubmit",
    defaultValues: { name: "", description: "", type: MenuItemType.Starter, price: 0 },
  });

  const { mutate, data, isError, error, status } = useMutation({ mutationFn: AddRestaurantMenuItemService });

  useEffect(() => {
    if (status === "success") {
      toast(data.message);
    }

    if (isError) {
      console.log(error);
    }

    if(data){
      console.log(data)
    }
  }, [status, data, isError, error]);

  function onSubmit(values: z.infer<typeof AddRestaurantMenuItem>) {
    const submissionValues = {
      ...values,
      price: Number(values.price),
    };
    mutate(submissionValues);
    form.reset();
  }

  return (
    <>
      <NavbarRestaurateur />
      <div className="w-full flex justify-center pt-16">
        <div className="flex flex-col justify-center gap-y-10 px-20 w-2/5">
          <H3>Add Menu</H3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(MenuItemType).map(([label, val]) => (
                            <SelectItem key={val} value={val} onClick={() => onChange(val)}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value || ""} onChange={e => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {status === "pending" ? <Spinner /> : "Changer"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      
    </>    
  );
}