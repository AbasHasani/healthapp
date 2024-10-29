import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface props {
  isLoading: boolean;
  className?: string;
  children: ReactNode;
}

const SubmitButton: FC<props> = ({ isLoading, className, children }) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src={"/assets/icons/loader.svg"}
            width={24}
            height={24}
            className="animate-spin"
            alt="loader"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
