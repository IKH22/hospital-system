import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface Props {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}
const SubmitButton = ({ isLoading, className, children }: Props) => {
  return (
    <Button
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
      type="submit"
    >
      {isLoading ? (
        <div>
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
