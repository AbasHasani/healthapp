import RegisterForm from "@/components/forms/registerForm";
import { getUser } from "@/lib/actinos/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
// import * as Sentry from "@sentry/nextjs"


interface props {
  params: Promise<{
    userId: string
  }>
}

const Register: FC<props> = async props => {
  const {userId} = await props.params;
  const user = await getUser(userId);

  // Sentry.metrics.set("user_view", user.name)
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar1 container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Image
            src="/assets/icons/logo-full.svg"
            alt="Patient"
            className="mb-12 h-10 w-fit"
            width={1000}
            height={1000}
          />
          <RegisterForm user={user} />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="copyright pb-12">
              C 2024 CarePlus
            </p>
          </div>
        </div>
      </section>
      <Image
        src={"/assets/images/register-img.png"}
        width={1000}
        height={1000}
        alt="patinet"
        className="side-img max-w-[396px]"
      />
      
    </div>
  );
};

export default Register;
