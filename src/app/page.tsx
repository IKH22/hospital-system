import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex max-h-screen h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container  max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="CarePulse logo"
            width={173}
            height={40}
            className="mb-12 h-10 w-fit"
          />
          <PatientForm></PatientForm>
        </div>
        <div className="text-14-regular mt-20 flex justify-between">
          <p className=" justify-items-end text-dark-600 xl:text-left">
            © 2024 CarePulse
          </p>
          <Link href="/?admin=true" className="text-green-500">
            Admin
          </Link>
        </div>
      </section>
      <Image
        src="/assets/images/doctor_welcome.png"
        alt="doctors welcome"
        height={1000}
        width={1000}
        priority
        sizes="(min-width: 2120px) 1000px, calc(46.21vw + 30px)"
        className="hidden md:block h-full object-cover max-w-[50%]"
      />
    </div>
  );
}
