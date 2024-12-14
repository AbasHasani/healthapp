import clsx from "clsx";
import Image from "next/image";
import React, { FC } from "react";

interface props {
  icon: string;
  count: number;
  label: string;
  type: "appointments" | "pending" | "cancelled";
}

const StatCard: FC<props> = ({ type, count = 0, icon, label }) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image src={icon} height={32} width={32} alt="" />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-12-regular">{label}</p>
    </div>
  );
};

export default StatCard;
