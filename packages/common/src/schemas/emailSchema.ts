import Zod from "zod";

export const emailSchemaFactory = (message?: string) =>
  Zod.string()
    .trim()
    .pipe(Zod.email(message ?? "Please enter a valid email address"));

export const EmailZodSchema = emailSchemaFactory();
