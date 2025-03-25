"use client";

import {
  AudioWaveform,
  Command,
  Component,
  GalleryVerticalEnd,
  LayoutDashboard,
  Percent,
  Shapes,
  ShoppingBasket,
  User,
  Rss,
} from "lucide-react";

import * as React from "react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { setAccessToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  projects: [
    {
      name: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      name: "User",
      url: "/user",
      icon: User,
    },
    {
      name: "Category",
      url: "/category",
      icon: Shapes,
    },
    {
      name: "Coupon",
      url: "/coupon",
      icon: Component,
    },
    {
      name: "Discount",
      url: "/discount",
      icon: Percent,
    },
    {
      name: "Products",
      url: "/product",
      icon: ShoppingBasket,
    },
    {
      name: "Blog",
      url: "/blog",
      icon: Rss,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_O2_API_URL}api/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.ok) {
        dispatch(setAccessToken(null));
        localStorage.removeItem("access_token");

        // Redirect to login
        router.push("/login");
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent className={` scrollbar-hide`}>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <div
          onClick={() => handleLogout()}
          className="w-full bg-accent py-2 cursor-pointer text-center rounded-md text-white"
        >
          Log out
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
