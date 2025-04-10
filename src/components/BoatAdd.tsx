"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoatValues } from "@/lib/types";
import { boatSchema } from "@/lib/schemas";
import { addBoat } from "@/lib/services/boatServices";

export default function BoatAdd() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BoatValues>({
    resolver: zodResolver(boatSchema),
    defaultValues: {
      name: "",
      description: "",
      boatSize: "SMALL",
    },
  });

  async function onSubmit(values: BoatValues) {
    setIsSubmitting(true);

    try {
      const success = await addBoat(values);

      if (success) {
        router.refresh();
        form.reset();
      } else {
        setApiError("An unexpected error occurred while adding the boat.");
      }
    } catch (error) {
      console.error("Error adding boat:", error);
      setApiError("An unexpected error occurred while adding the boat.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter boat name" {...field} />
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
                  <Input placeholder="Enter boat description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="boatSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMALL">Small</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="BIG">Big</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {apiError && <p className="text-red-500">{apiError}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Boat"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
