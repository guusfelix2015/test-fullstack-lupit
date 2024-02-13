import { cn } from "@/lib/utils";
import { type FieldErrors, type FieldValues } from "react-hook-form";
import { get } from "lodash";

type Props = JSX.IntrinsicElements["div"] & {
  fieldName: string;
  errors: FieldErrors<FieldValues>;
};

export const FormError = ({ fieldName, errors, ...props }: Props) => {
  if (!get(errors, fieldName)) return null;

  return (
    <div
      {...props}
      className={cn(
        "mt-1 flex items-center text-sm text-red-500",
        props.className
      )}
    >
      <span>{String(get(errors, `${fieldName}.message`))}</span>
    </div>
  );
};
