import { type ReactNode } from "react";

const InputWrapper = ({
  className,
  children,
  error,
}: {
  children: ReactNode;
  error?: string;
  className?: string;
}) => {
  return (
    <label className={`relative flex flex-col ${className ?? ""}`}>
      {children}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </label>
  );
};

export default InputWrapper;
