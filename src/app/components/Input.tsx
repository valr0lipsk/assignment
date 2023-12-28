import { type ReactNode } from "react";
import { type UseFormRegister } from "react-hook-form";

interface InputProps {
  inputType: string;
  placeholder?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  error?: string;
  children?: ReactNode;
  autoComplete?: "off" | "on";
  disabled?: boolean;
}

const Input = ({
  inputType,
  placeholder,
  className,
  register,
  name,
  children,
  disabled = false,
}: InputProps) => {
  return (
    <>
      <input
        disabled={disabled}
        {...register(`${name}`)}
        type={inputType}
        placeholder={placeholder}
        className={`rounded-l10 bg-teal-500 px-[1.075rem] py-[0.625rem] text-white  focus:outline-none ${
          className ?? ""
        }`}
      />
      {children}
    </>
  );
};

export default Input;
