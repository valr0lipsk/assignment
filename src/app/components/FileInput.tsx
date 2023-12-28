import { useRef, useEffect, useState } from "react";
import { type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import UploadIcon from "../icons/upload";
import { useDropzone } from "react-dropzone";

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
  preSelectedFileName,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayedTitle, setDisplayedTitle] = useState<string>(
    preSelectedFileName
      ? preSelectedFileName
      : "Drag and drop files here or click to browse.",
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setValue("file", acceptedFiles[0]);

      if (acceptedFiles[0]?.name) {
        setDisplayedTitle(acceptedFiles[0]?.name);
      } else setDisplayedTitle("Drag and drop files here or click to browse.");
    },
  });

  return (
    <div className="relative" {...getRootProps()}>
      {error && (
        <p className="font-inter absolute ml-2 mt-2 flex text-xs font-normal text-red-500">
          {error}
        </p>
      )}
      <div
        className={`font-inter flex flex-col rounded border border-dashed border-neutral-200 bg-teal-500 p-3 text-sm font-normal transition-colors duration-150 focus:border-indigo-600 focus:outline-none ${
          className ?? ""
        }`}
      >
        <button className="m-auto flex flex-col items-center text-white">
          <UploadIcon className="mb-2" />
          {displayedTitle}
        </button>
      </div>
      <input
        {...register(`${name}`)}
        type="file"
        className="hidden"
        ref={inputRef}
        {...getInputProps()}
      />
    </div>
  );
};

export default FileInput;
