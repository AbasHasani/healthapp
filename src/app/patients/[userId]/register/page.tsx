import RegisterForm from "@/components/forms/registerForm";
import { getUser } from "@/lib/actinos/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface props {
  params: {
    userId: string
  }
}

const Register: FC<props> = async ({ params }) => {
  const user = await getUser(params.userId)
  return (
    <div>
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="./assets/icons/logo-full.svg"
            alt="Patient"
            className="mb-12 h-12 w-fit"
            width={1000}
            height={1000}
          />
          <RegisterForm user={user} />
          <div className="text-14-regulear mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              C 2024 CarePlus
            </p>
            <Link href={"/?admin=true"} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src={"/assets/images/onboarding-img.png"}
        width={1000}
        height={1000}
        alt="patinet"
        className="side-img max-w-[396px]"
      />
    </div>
  );
};

export default Register;
