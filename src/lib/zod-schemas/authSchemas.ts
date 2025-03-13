import { z } from "zod";

const LoginSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 2 characters",
  }),
  email: z
    .string()
    .min(1, { message: "Email is necessary." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 characters long" })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export type LoginType = z.infer<typeof LoginSchema>;

const RegisterSchema = LoginSchema.pick({ email: true, password: true });

export type RegisterType = z.infer<typeof RegisterSchema>;

export { RegisterSchema, LoginSchema };
