import React, { FC, ReactNode } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/patientForm";
import Image from "next/image";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface props {
  control: Control<any>;
  filedType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconAlt?: string;
  iconSrc?: string;
  dateFormat?: string;
  showTimeSelect?: boolean;
  disable?: boolean;
  children?: ReactNode;
  renderSkeleton?: (field: any) => ReactNode;
}

interface RenderFieldProps {
  field: any;
  props: props;
}

const RenderField: FC<RenderFieldProps> = ({ field, props }) => {
  const { control, filedType, name, label, iconSrc, iconAlt, placeholder } =
    props;
  switch (props.filedType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-400 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || ""}
              className="ml-2"
              height={24}
              width={24}
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    default:
      return 5;
  }
};

const CustomFormField: FC<props> = (props) => {
  const { control, filedType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 ">
          {filedType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField props={props} field={field} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
