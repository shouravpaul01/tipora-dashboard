"use client";

import { useState } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";

import {
  FieldGroup,
  FieldSet,
  FieldSeparator,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/form/FormInput";



import { useChangePasswordMutation } from "@/redux/api/authApi";
import { changePasswordSchema } from "@/validation/auth.validation";

export default function ChangePasswordForm() {
  const [showOldPassword, setShowOldPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [changePassword, { isLoading }] =
    useChangePasswordMutation();

  const methods = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword:""
    },
  });

  const onSubmit = async (
    data: FieldValues
  ) => {
    try {
      const res = await changePassword(data).unwrap();

      toast.success(
        res?.message || "Password changed successfully 🎉"
      );

      methods.reset();
    } catch (err: any) {
      const errorMessages =
        err?.data?.errorMessages;

      if (Array.isArray(errorMessages)) {
        errorMessages.forEach((e: any) => {
          methods.setError(e.path, {
            type: "server",
            message: e.message,
          });
        });
      } else {
        toast.error(
          err?.data?.message ||
            "Something went wrong ❌"
        );
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FieldSet>
          <FieldGroup>
            <FormInput
              name="currentPassword"
              label="Current Password"
              type={
                showOldPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter current password"
              startIcon={{
                icon: LockKeyhole,
              }}
              endIcon={{
                icon: showOldPassword
                  ? EyeOff
                  : Eye,
                onClick: () =>
                  setShowOldPassword(
                    (prev) => !prev
                  ),
              }}
            />

            <FormInput
              name="newPassword"
              label="New Password"
              type={
                showNewPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter new password"
              startIcon={{
                icon: KeyRound,
              }}
              endIcon={{
                icon: showNewPassword
                  ? EyeOff
                  : Eye,
                onClick: () =>
                  setShowNewPassword(
                    (prev) => !prev
                  ),
              }}
            />
              <FormInput
              name="confirmPassword"
              label="Confirm Password"
              type={
                showNewPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm password"
              startIcon={{
                icon: KeyRound,
              }}
              endIcon={{
                icon: showConfirmPassword
                  ? EyeOff
                  : Eye,
                onClick: () =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  ),
              }}
            />
          </FieldGroup>

          <FieldSeparator />
        </FieldSet>

        <Button
          type="submit"
          className="w-full h-12"
          disabled={isLoading}
        >
          {isLoading
            ? "Updating..."
            : "Change Password"}
        </Button>
      </form>
    </FormProvider>
  );
}