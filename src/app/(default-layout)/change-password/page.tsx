import ChangePasswordForm from "@/components/auth/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Change Password</h1>

          <p className="text-muted-foreground mt-1">
            Update your account password.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
