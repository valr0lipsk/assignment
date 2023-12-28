"use client";

import { SignInSchema, type SignInSchemaType } from "~/lib/schemas";
import Input from "./Input";
import InputWrapper from "./InputWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  const handleFormSubmit = (val: SignInSchemaType) => {
    console.log(val);
  };

  return (
    <form className="min-w-[300px]" onSubmit={handleSubmit(handleFormSubmit)}>
      <InputWrapper className="mb-6" error={errors.email?.message?.toString()}>
        <Input
          inputType="email"
          name="email"
          placeholder="Email"
          register={register}
        />
      </InputWrapper>
      <InputWrapper
        className="mb-6"
        error={errors.password?.message?.toString()}
      >
        <Input
          inputType="password"
          name="password"
          placeholder="Password"
          register={register}
        />
      </InputWrapper>

      <label className="mb-6 flex translate-x-[25%] items-center">
        <input
          type="checkbox"
          {...register("rememberMe")}
          className={`relative mr-2 h-[1.125rem] w-[1.125rem] appearance-none rounded bg-teal-500 checked:after:absolute checked:after:-bottom-[10%] checked:after:left-[15%] checked:after:text-base checked:after:font-semibold 	checked:after:text-white checked:after:content-['✓'] ${
            errors.rememberMe?.message ? "border-red-600" : "border-teal-500"
          }`}
        />
        Remember me
      </label>

      <button
        className="rounded-l10 w-full bg-green-400 py-4 disabled:opacity-70"
        type="submit"
        disabled={isSubmitting}
      >
        Login
      </button>
    </form>
  );
};

export default SignInForm;
