import { useRef, useEffect } from "react";
import { type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import UploadIcon from "../icons/upload";

interface InputProps {
  placeholder?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  preSelectedFileName?: string;
}

const FileInput = ({
  className,
  register,
  name,
  error,
  setValue,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    setValue("file", inputRef.current?.files);
  }, [inputRef.current?.files]);

  return (
    <>
      <div
        className={`font-inter flex flex-col rounded border border-dashed border-neutral-200 bg-teal-500 p-3 text-sm font-normal transition-colors duration-150 focus:border-indigo-600 focus:outline-none ${
          className ?? ""
        }`}
      >
        <button
          className="m-auto flex flex-col items-center text-white"
          onClick={handleClick}
        >
          <UploadIcon className="mb-2" />
          Drop an image here
        </button>
      </div>
      <input
        {...register(`${name}`)}
        type="file"
        className="hidden"
        ref={inputRef}
      />
      {error && (
        <p className="font-inter mt-2 flex text-xs font-normal text-red-500">
          {error}
        </p>
      )}
    </>
  );
};

export default FileInput;
