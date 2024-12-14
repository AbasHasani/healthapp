"use client";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AppointmentForm from "./forms/appointmentForm";
import { Appointment } from "../../types/appwrite.types";

interface props {
  type: "cancel" | "schedule";
  patientId: string;
  userId: string;
  appointment?: Appointment;
}

const AppointmentModal: FC<props> = ({
  type,
  patientId,
  userId,
  appointment,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p
          className={`capitalize p-3 rounded-md ${type === "schedule" ? "text-green-500" : ""}`}
        >
          {type}
        </p>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} an appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
            userId={userId}
            patientId={patientId}
            type={type}
            setOpen={setOpen}
            appointment={appointment}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
