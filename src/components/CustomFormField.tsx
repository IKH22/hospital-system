import React from "react";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, ControllerRenderProps } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "./ui/select";
import { SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface Props {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  placeholder?: string;
  label?: string;
  iconAlt?: string;
  iconSrc?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (
    field: ControllerRenderProps<any, string>
  ) => React.ReactNode;
}
const RenderField = ({
  field,
  props,
}: {
  field: ControllerRenderProps<any, string>;
  props: Props;
}) => {
  const {
    fieldType,
    label,
    iconAlt,
    iconSrc,
    placeholder,
    renderSkeleton,
    dateFormat,
    showTimeSelect,
    disabled,
  } = props;
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="rounded-md flex border border-dark-500 bg-dark-400">
          {iconSrc && iconAlt && (
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={24}
              height={24}
              className="ml-2 mt-2 h-6 w-auto"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              autoComplete={label}
              {...field}
              className="shad-input ring-offset-dark-500 border-0"
            ></Input>
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInputWithCountry
            name={props.name}
            defaultCountry="AE"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone ring-offset-dark-500"
            autoComplete="on"
          ></PhoneInputWithCountry>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="rounded-md flex border border-dark-500 bg-dark-400">
          {iconSrc && iconAlt && (
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={24}
              height={24}
              className="ml-2 mr-2 mt-2 h-6 w-auto"
            />
          )}
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time: "
              wrapperClassName="date-picker"
              className="ring-offset-dark-500"
            ></DatePicker>
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            name={props.name}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue
                  className="ring-offset-dark-500"
                  placeholder={placeholder}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            className="bg-dark-400 ring-offset-dark-500 placeholder:text-dark-600 border-dark-500 focus:border-dark-500"
            placeholder={placeholder}
            disabled={disabled}
            {...field}
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              className="border border-solid border-white"
              id={props.name}
              name={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    default:
      return null;
  }
};
const CustomFormField = (props: Props) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType &&
            label &&
            (fieldType === FormFieldType.SKELETON ? (
              <FormLabel htmlFor={undefined}>
                <div className="mb-4 font-semibold text-balg">{label}</div>
                <RenderField field={field} props={props} />
              </FormLabel>
            ) : fieldType === FormFieldType.CHECKBOX ? (
              <RenderField field={field} props={props} />
            ) : (
              <FormLabel>
                <div className="mb-4 font-semibold text-balg">{label}</div>
                <RenderField field={field} props={props} />
              </FormLabel>
            ))}

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
