"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormSchema } from "@/lib/validation";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Doctors, IdentificationTypes } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const RegisterForm = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormSchema>) {
    setisLoading(true);
    setisLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1 "
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Let us know more about you</h1>
          <p className="text-dark-700">
            Please complete the form to schedule your appointments seamlessly.
          </p>
        </section>
        <section className="space-y-6">
          <h2 className="font-bold mb-10 mt-14 text-2xl md:text-3xl">
            Personal Information
          </h2>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <div className="flex flex-col gap-7 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              name="phone"
              label="Phone number"
            />
          </div>
          <div className="flex flex-col gap-7 xl:flex-row">
            <CustomFormField
              control={form.control}
              iconSrc="/assets/icons/calendar.svg"
              iconAlt="calendar"
              fieldType={FormFieldType.DATE_PICKER}
              name="birthDate"
              label="Date of birth"
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="gender"
                  >
                    {["Male", "Female"].map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem
                          className=" bg-white"
                          value={option}
                          id={option}
                        />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
            />
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="font-bold mb-10 mt-16 text-2xl md:text-3xl">
            Medical Information
          </h2>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Primary Care Physician"
            placeholder="Select a physician"
            iconSrc="/assets/icons/arrow.svg"
            iconAlt="arrow"
          >
            {Doctors.map((doctor) => (
              <SelectItem
                className="hover:bg-black focus:bg-dark-300"
                key={doctor.name}
                value={doctor.name}
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    width={32}
                    height={32}
                    alt={doctor.name}
                    src={doctor.image}
                    className="rounded-full border border-dark-500"
                  />
                  <p className="text-white">{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <div className="flex flex-col gap-7 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="ex: Red crescent"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ex: ABC123456"
            />
          </div>
          <div className="flex flex-col gap-7 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="allergies"
              label="Allergies (if any)"
              placeholder="ex: Peanuts, Pollen"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="currentMedication"
              label="Current medications (if any)"
              placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>
          <div className="flex flex-col gap-7 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="familyMedicalHistory"
              label="Family medical history (if relevant)"
              placeholder="ex: Father had heart disease"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="pastMedicalHistory"
              label="Past Medical History (if relevant)"
              placeholder="ex: Asthma"
            />
          </div>
        </section>
        <section className="space-y-6">
          <h2 className="font-bold mb-10 mt-16 text-2xl md:text-3xl">
            Identification and Verification
          </h2>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification type"
            placeholder="Select an identification type"
          >
            {IdentificationTypes.map((type) => (
              <SelectItem
                className="flex cursor-pointer items-center gap-2 bg-dark-400 focus:bg-dark-300 focus:text-white focus-visible:font-bold text-white"
                value={type}
                key={type}
              >
                {type}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="identificationNumber"
            label="Identification number"
            placeholder="123456789"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="identificationDocument"
            label="Scanned copy of identification document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader
                  files={field.value}
                  onChange={field.onChange}
                ></FileUploader>
              </FormControl>
            )}
          />
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I confirm that I have reviewed and agree to the privacy policy."
          />
        </section>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
