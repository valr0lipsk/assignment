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

export const MovieSchema = z.object({
  title: z.string().min(3, { message: "Should contain at least 3 characters" }),
  publishYear: z.number().positive(),
  file: z.any().refine(
    // file can be empty to save prev file
    (files: File[]) => {
      let fileNameSplitted, fileType;
      const file = files?.length > 0 ? files[0] : null;

      if (file) {
        fileNameSplitted = file.name.split(".");
        fileType = fileNameSplitted[fileNameSplitted.length - 1];
      }
      return !file || (!!file && (fileType === "jbg" || fileType === "png"));
    },
    {
      message: "Only .jpg and .png files are allowed to be attached.",
    },
  ),
});

export type MovieSchemaType = z.infer<typeof MovieSchema>;
