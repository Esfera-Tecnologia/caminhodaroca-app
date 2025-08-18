import { z } from "zod";
import { messages } from "./messages";

export const optionalStringSchema = z
  .string()
  .optional();
  
export const stringSchema = z
  .string({
    error: messages.required
  })
  .trim()
  .nonempty(messages.required);

export const emailSchema = z
  .email(messages.invalidEmail)

export const dateSchema = z
  .string({
    error: messages.required
  })
  .nonempty(messages.required)
  .regex(
    /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    messages.invalidDate("dd/mm/YYYY")
  )
  .refine((dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }, messages.invalidDate("dd/mm/YYYY"));

export const timeSchema = z
  .string({
    error: messages.required
  })
  .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, messages.invalidTime("HH:mm"));

export const booleanSchema = z
  .boolean({
    error: messages.required
  })

export const optionalTimeSchema = z
  .string()
  .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, messages.invalidTime("HH:mm"))
  .optional()
  .or(z.literal("")); 

export const optionalDecimalSchema = z
  .string()
  .regex(/^\d{1,8}(\.\d{1,2})?$/, {
    message: "Deve ser um número decimal com até 10 dígitos no total",
  })
  .refine((val) => parseFloat(val) <= 99999999.99, {
    message: "O valor deve ser menor ou igual a 99.999.999,99",
  })
  .optional();

export const decimalSchema = z
  .string({
    error: messages.required
  })
  .regex(/^\d{1,8}(\.\d{1,2})?$/, {
    message: "Deve ser um número decimal com até 10 dígitos no total",
  })
  .refine((val) => parseFloat(val) <= 99999999.99, {
    message: "O valor deve ser menor ou igual a 99.999.999,99",
  })
  .refine((val) => parseFloat(val) !== 0, {
    message: messages.required,
  });

export const naturalNumberSchema = z
  .number({
    error: messages.required
  })
  .int()
  .positive(messages.positive);

export const step1Schema = z.object({
    name: stringSchema,
    email: emailSchema,
    password: stringSchema.min(6, 'A senha deve ter ao menos 6 caracteres'),
    state: stringSchema,
    ageRange: stringSchema,
    travelWith: optionalStringSchema,
  });
  
export const step2Schema = z.object({
    age: z
      .number()
      .min(18, "Você deve ter pelo menos 18 anos"),
    country: z.string().min(1, "Selecione um país"),
  });
  
export const step3Schema = z.object({
    terms: z.boolean(),
  });

export const registrationSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema);