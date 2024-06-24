"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UserIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button size="icon" variant="ghost" className="w-10 h-10">
        <UserIcon className="w-6 h-6" />
      </Button>
    );
  }

  if (status === "authenticated") {
    return (
      <Button size="icon" variant="ghost" asChild className="w-10 h-10 p-0">
        <Link href={`/dashboard`}>
          <Image
            src={session.user?.image ?? "/mememan.webp"}
            width={40}
            height={40}
            alt={session.user?.name ?? "User"}
            className="rounded-full"
          />
        </Link>
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => signIn()}
      className="w-10 h-10"
    >
      <UserIcon className="w-6 h-6" />
    </Button>
  );
}
