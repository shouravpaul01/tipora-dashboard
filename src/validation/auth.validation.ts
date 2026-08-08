import z from "zod";


export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required"),

  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters"),
});


export const registerSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),

  category: z.string().min(1, "Category is required"),

  image: z.array(z.string()).min(1, "Profile image is required"),
  licence_image: z.array(z.string()).optional(),
  id_image: z.array(z.string()).min(1, "ID image is required"),
  id_with_image: z.array(z.string()).min(1, "ID with image is required"),

  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().nonempty("Confirm password is required."),
    isAgree: z.boolean(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
}).refine((data) => data.isAgree === true, {
    message: "You must accept Terms & Conditions",
    path: ["isAgree"],
  });



export const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required"),
    newPassword: z.string().nonempty("New password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
