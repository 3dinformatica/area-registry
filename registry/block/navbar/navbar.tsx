"use client";

import React from "react";
import { NavbarContent, NavbarIcon, NavbarOptions } from "@/components/navbar-content";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  iconSrc: string;
  iconHref: string;
  leading?: React.ReactNode[];
  trailing?: React.ReactNode[];
}

export function Navbar({
  iconSrc = "/3d-logo.png",
  iconHref = "/",
  leading,
  trailing,
  ...props 
}: NavbarProps) {
  return (
    <NavbarContent {...props}>
      <NavbarIcon src={iconSrc} href={iconHref} />
      <NavbarOptions startPoint="left">{leading}</NavbarOptions>
      <NavbarOptions startPoint="right">{trailing}</NavbarOptions>
    </NavbarContent>
  );
}
