"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../customFormField";
import SubmitButton from "../submitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actinos/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phone_input",
  DATE_PICKER = "datepicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

//shadcn@latest
//shadcn-ui@latest
const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      console.log("Starting...")
      const userData = {
        name,
        email,
        phone,
      };
      const user = await createUser(userData)
      console.log(user);
      if (user) {
        router.push(`/patients/${user.$id}/register`)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          filedType={FormFieldType.INPUT}
          name="name"
          label="full name"
          placeholder="john doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt=""
        />
        <CustomFormField
          control={form.control}
          filedType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt=""
        />
        <CustomFormField
          control={form.control}
          filedType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="(555) 555 235"
          iconSrc="/assets/icons/phone.svg"
          iconAlt=""
        />
        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
