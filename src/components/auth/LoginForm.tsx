"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSeparator, FieldSet } from "@/components/ui/field";

import { FormInput } from "../shared/form/FormInput";
import { FormPhoneInput } from "../shared/form/FormPhoneInput";

import { loginSchema } from "@/validation/auth.validation";

import { useLoginMutation } from "@/redux/api/authApi";
import { loginSuccess } from "@/redux/features/authSlice";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const res: any = await login({
        phone: data.phone,
        password: data.password,
      }).unwrap();

      dispatch(
        loginSuccess({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          user: res.data.user,
        }),
      );

      toast.success(res.message || "Login successful 🎉");

      methods.reset();

      router.replace("/dashboard");
    } catch (error: any) {
      const apiError = error?.data;

      console.log(apiError);

      if (apiError?.errorMessages?.length) {
        apiError.errorMessages.forEach(
          (err: { path: string; message: string }) => {
            if (!err.path) {
              // Global error
              toast.error(err.message);
            } else {
              // Field error
              methods.setError(err.path as any, {
                type: "server",
                message: err.message,
              });
            }
          },
        );

        return;
      }

      toast.error(apiError?.message || "Login failed");
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FieldSet>
          <FieldGroup>
            <FormPhoneInput
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              defaultCountry="bd"
              disabled={isLoading}
            />

            <FormInput
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              disabled={isLoading}
              startIcon={{
                icon: LockKeyhole,
              }}
              endIcon={{
                icon: showPassword ? EyeOff : Eye,
                onClick: () => setShowPassword((prev) => !prev),
                disabled: isLoading,
              }}
            />
          </FieldGroup>

          <FieldSeparator />
        </FieldSet>

        <Button type="submit" className="h-12 w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
