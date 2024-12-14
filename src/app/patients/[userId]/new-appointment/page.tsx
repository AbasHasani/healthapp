import AppointmentForm from "@/components/forms/appointmentForm";
import PatientForm from "@/components/forms/patientForm";
import { Button } from "@/components/ui/button";
import { getPatient } from "@/lib/actinos/patient.actions";
import { SearchParams } from "next/dist/server/request/search-params";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import * as Sentry from "@sentry/nextjs"

interface props {
  params: Promise<{userId: string}>
}


const NewAppointment: FC<props> =  async ({params}) => {
  const {userId} = await params;
  const patient = await getPatient(userId)

  Sentry.metrics.set("user_view_new_appointment", patient.name)
  return (
    <div className="flex h-screen max-h-screen">
      {/* Todo: OTP verificatino */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[960px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Patient"
            width={1000}
            height={1000}
            className="mb-12 h-12 w-fit"
          />
          <AppointmentForm type="create" userId={userId} patientId={patient.$id} />
          <p className="copyright my-10">
            C 2024 CarePlus
          </p>
        </div>
      </section>
      <Image
        src={"/assets/images/appointment-img.png"}
        width={1000}
        height={1000}
        alt="appointmenet"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}

export default NewAppointment