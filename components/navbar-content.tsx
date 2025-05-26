"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

interface NavbarOptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  startPoint?: "left" | "right";
  children?: React.ReactNode[];
}

function NavbarOptions(props: NavbarOptionsProps) {
  const { children, startPoint = "left", ...rest } = props;
  return <div className={cn('flex flex-1 w-10 h-10 bg-foreground/10 items-center gap-1.5', rest.className, startPoint === "left" ? "justify-start" : "justify-end")} {...rest}>{children}</div>;
}
NavbarOptions.displayName = "NavbarOptions";

interface NavbarIconProps extends React.HTMLAttributes<HTMLAnchorElement> {
  src: string;
  href: string;
}

function NavbarIcon({ src, href, ...props }: NavbarIconProps) {
  return (
    <Link href={href} className="aspect-square size-10" {...props}>
      <Image
        src={src}
        alt="AReA Logo"
        width={32}
        height={32}
        className="size-10 rounded-full bg-white/80 p-1.5 transition-all duration-300 hover:scale-110"
      />
    </Link>
  );
}
NavbarIcon.displayName = "NavbarIcon";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function NavbarContent(props: NavbarProps) {
  const { children, ...rest } = props;

  return (
    <nav className="sticky top-0 z-50 w-full h-fit">
      <div className="flex h-fit max-w-full items-center justify-start bg-primary px-6 py-3 gap-10" {...rest}>
        {children}
      </div>
    </nav>
  );
}

NavbarContent.Icon = NavbarIcon;
NavbarContent.Options = NavbarOptions;

export { NavbarContent, NavbarIcon, NavbarOptions };