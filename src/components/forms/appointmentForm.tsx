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
import { FC, useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actinos/patient.actions";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import { Doctors } from "@/constants";
import { FormFieldType } from "./patientForm";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actinos/appointment.actions";
import { Appointment } from "../../../types/appwrite.types";

interface props {
  userId: string;
  patientId: string;
  type: string;
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}

const AppointmentForm: FC<props> = ({
  type,
  patientId,
  userId,
  appointment,
  setOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const AppointmentFormValidation = getAppointmentSchema(type);
  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointement";
      break;
    case "create":
      buttonLabel = "Create Appointement";
      break;
    case "schedule":
      buttonLabel = "schedule Appointement";
      break;
    default:
      buttonLabel = "Failed";
      break;
  }
  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async ({
    primaryPhysician,
    reason,
    note,
    schedule,
    cancellationReason,
  }: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);
    console.log("Working");

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician,
          reason: reason!,
          note,
          schedule,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: primaryPhysician,
            schedule: new Date(schedule),
            status: status as Status,
            cancellationReason: cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
      console.log("Starting...");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New appointment</h1>
            <p className="text-dark-700">Appoint in 5 minutes</p>
          </section>
        )}
        {type != "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              filedType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a Doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              filedType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              showTimeSelect
              label="Expected appointment date"
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                filedType={FormFieldType.TEXTAREA}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
              />
              <CustomFormField
                control={form.control}
                filedType={FormFieldType.TEXTAREA}
                name="note"
                label="Notes"
                placeholder="Enter notes"
              />
            </div>
          </>
        )}
        {type === "cancel" && (
          <CustomFormField
            control={form.control}
            filedType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="reason for cancellation"
            placeholder="Enter resson for cancellation"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
