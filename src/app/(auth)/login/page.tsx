import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/shared/Logo";
import SectionHeader from "@/components/shared/SectionHeader";

import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Shield,
  KeyRound,
  ScanFace,
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <div className="relative hidden overflow-hidden bg-[#03081B] lg:flex items-center justify-center">
        {/* Background Icons */}
        <ShieldCheck className="absolute top-16 left-20 h-20 w-20 text-white/5 rotate-[-20deg] animate-float" />

        <Lock className="absolute top-28 right-24 h-16 w-16 text-blue-400/10 animate-pulse" />

        <Fingerprint className="absolute bottom-24 left-24 h-24 w-24 text-cyan-400/10 animate-scale-soft" />

        <Shield className="absolute bottom-16 right-20 h-20 w-20 text-white/5 animate-float-slow" />

        <KeyRound className="absolute top-1/2 left-12 h-14 w-14 text-sky-400/10 -translate-y-1/2 animate-rotate-slow" />

        <ScanFace className="absolute top-1/2 right-12 h-16 w-16 text-white/5 -translate-y-1/2 animate-float" />

        {/* Glow */}
        <div className="absolute h-[420px] w-[420px] rounded-full bg-blue-500/30 blur-[120px] animate-pulse" />

        {/* Logo */}
        <div className="relative z-10">
          <Logo src="/images/logo.svg" width={300} height={300} />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-lg space-y-12">
          <SectionHeader
            title="Welcome 👋"
            description="Enter your credentials to access your account"
          />

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
