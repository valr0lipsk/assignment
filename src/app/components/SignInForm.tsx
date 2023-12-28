"use client";

import { SignInFormSchema, type SignInFormSchemaType } from "~/lib/schemas";
import Input from "./Input";
import InputWrapper from "./InputWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
  });

  const router = useRouter();

  const handleFormSubmit = async (val: SignInFormSchemaType) => {
    try {
      const res = await signIn("credentials", { ...val, redirect: false });

      if (res?.error) alert(res.error);
      else if (res?.ok) {
        router.push("/movies");
      }
    } catch (error) {
      alert(error);
    }
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
        className="w-full rounded-l10 bg-green-400 py-4 disabled:opacity-70"
        type="submit"
        disabled={isSubmitting}
      >
        Login
      </button>
    </form>
  );
};

export default SignInForm;
