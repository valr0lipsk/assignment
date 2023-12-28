import { z } from "zod";

const emailRegex = new RegExp("^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$", "g");

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(emailRegex, { message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.literal<boolean>(true),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const MovieAddSchema = z.object({
  title: z.string().min(3, { message: "Should contain at least 3 characters" }),
  publishYear: z
    .string()
    .min(4, { message: "Should contain at least 4 characters" })
    .refine(
      (val) => {
        const year = +val;

        return year <= 2024;
      },
      {
        message: "Year can't be greater than 2024",
      },
    ),
  file: z
    .any()
    .refine(
      (files: File[]) => {
        return files.length > 0;
      },
      {
        message: "Poster is required",
      },
    )
    .refine(
      // file can be empty to save prev file
      (files: File[]) => {
        let fileNameSplitted, fileType;
        const file = files?.length > 0 ? files[0] : null;

        if (file) {
          fileNameSplitted = file.name.split(".");
          fileType = fileNameSplitted[fileNameSplitted.length - 1];
        }
        return !file || (!!file && (fileType === "jpg" || fileType === "png"));
      },
      {
        message: "Only .jpg and .png files are allowed to be attached.",
      },
    ),
});

export type MovieAddSchemaType = z.infer<typeof MovieAddSchema>;

export const MovieSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3, { message: "Should contain at least 3 characters" }),
  publishYear: z.string().min(4),
  posterLink: z.string(),
});

export type MovieSchemaType = z.infer<typeof MovieSchema>;
