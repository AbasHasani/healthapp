import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actinos/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import * as Sentry from "@sentry/nextjs"
import { getUser } from "@/lib/actinos/patient.actions";

interface props {
  searchParams: Promise<{ appointmentId: string }>;
  params: Promise<{ userId: string }>;
}

const Page: FC<props> = async ({ searchParams, params }) => {
  let { appointmentId } = await searchParams;
  const { userId } = await params;
  appointmentId = appointmentId ? (appointmentId as string) : "";
  const appointement = await getAppointment(appointmentId);
  const user = await getUser(userId);
  Sentry.metrics.set("user_view_new_appointment_success", user.name)

  const doctor = Doctors.find(
    (doc) => doc.name === appointement.primaryPhysician
  );
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            className="h-10 w-fit"
            alt="logo"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src={"/assets/gifs/success.gif"}
            width={300}
            height={200}
            alt="success"
          />
        </section>
        <h2 className="header mb-6 max-w-[600px] text-center">
          Your <span className="text-green-500">appointment requeset</span> has
          been successfully submitted!
        </h2>
        <p>We will be in touch shortly</p>
        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || ""}
              alt="doctor"
              width={100}
              height={100}
              className="size-10"
            />
            <p className="whitespace-nowrap">DR. {doctor?.name}</p>
            <div className="flex gap-2">
                <Image src={"/assets/icons/calendar.svg"} width={24} height={24} alt={doctor?.name || "dr. name"} />
                <p>{formatDateTime(appointement.schedule).dateTime}</p>
            </div>
          </div>
        </section>
        <Button variant={"outline"} className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>New Appointment</Link>
        </Button>
        <p className="copyright">C 2024 CarePulse</p>
      </div>
    </div>
  );
};

export default Page;
