"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  LogOut,
  House,
  Users,
  BadgeCent,
  Wallet,
  HandCoins,
  HandFist,
  Settings,
} from "lucide-react";
import Logo from "./shared/Logo";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { useLogoutMutation } from "@/redux/api/authApi";

// This is sample data.
const data = [
  {
    title: "Dashboard",
    url: "/",
    icon: <House />,
  },
  {
    title: "Users",
    url: "/users",
    icon: <Users />,
  },
  {
    title: "Tips",
    url: "/tips",
    icon: <HandCoins />,
  },
   {
    title: "Withdraw",
    url: "/withdraw",
    icon: <Wallet />,
  },
    {
    title: "Platform Revenue",
    url: "/platform-revenue",
    icon: <BadgeCent />,
  },
  {
    title: "Support",
    url: "/support",
    icon: <HandFist />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    await logoutMutation(undefined).unwrap();

    dispatch(logout());

    router.replace("/login");
    dispatch(logout());
    toast.success("Logged out successfully 👋");
    router.push("/login");
  };
  return (
    <Sidebar collapsible="icon" {...props} className="text-white ">
      <SidebarHeader className="flex items-center justify-center py-5">
        <Logo src="/images/logo2.png" />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter>
        <Button
          disabled={isLogoutLoading}
          variant="outline"
          className="w-full h-9 flex items-center justify-center gap-2 bg-primary/10 text-red-600 border-red-600 hover:bg-primary hover:text-white"
          onClick={() => handleLogout()}
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
