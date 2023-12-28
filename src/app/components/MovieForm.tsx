"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FileInput from "./FileInput";
import { MovieSchema, type MovieSchemaType } from "~/lib/schemas";
import InputWrapper from "./InputWrapper";
import Input from "./Input";

const MovieForm = () => {
  const {
    register,
    getValues,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<MovieSchemaType>({
    resolver: zodResolver(MovieSchema),
  });

  return (
    <form className="flex">
      <FileInput
        register={register}
        name="file"
        error={errors.file?.message?.toString()}
        setValue={setValue}
        className="mr-32 h-[32rem] w-[30rem]"
      />

      <fieldset className="w-[23rem]">
        <InputWrapper
          error={errors.title?.message?.toString()}
          className="mb-4"
        >
          <Input
            inputType="title"
            name="title"
            placeholder="Title"
            register={register}
          />
        </InputWrapper>

        <InputWrapper
          error={errors.publishYear?.message?.toString()}
          className="w-2/3"
        >
          <Input
            inputType="number"
            name="publishYear"
            placeholder="Publish Year"
            register={register}
          />
        </InputWrapper>

        <div className="mt-16 flex gap-4">
          <button
            className="rounded-l10 w-full border border-white  bg-transparent py-4 disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="rounded-l10 w-full border border-green-400 bg-green-400 py-4 disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default MovieForm;
