"use client";


import { useAppSelector } from "@/redux/hooks";
import { SocketProvider } from "./SocketProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector(
    (state) => state.auth.token
  );

  return (
    <SocketProvider token={token}>
      {children}
    </SocketProvider>
  );
}