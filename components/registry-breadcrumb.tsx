"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default function RegistryBreadcrumb() {
  const pathname = usePathname();
  const path = pathname.split("/").filter((item) => item !== "");

  const linkStyle =
    "text-base font-medium text-muted-foreground capitalize hover:underline hover:text-foreground";

  const breadcrumbItems = path.map((item, index) => {
    const href = `/${path.slice(0, index + 1).join("/")}`;

    console.log("path:", path);
    console.log("href:", href);
    console.log("index:", index);
    console.log("path.length:", path.length);

    return (
      <section key={href}  className="flex items-center gap-0">
        {index < path.length - 1 ? (
          <BreadcrumbItem>
            <BreadcrumbLink href={href} className={linkStyle}>
              {item}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-base font-medium capitalize text-foreground">{item}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
        {index < path.length - 1 && <BreadcrumbSeparator className="m-0" />}
      </section>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="p-0 m-0">
          <BreadcrumbLink href="/" className={linkStyle}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="m-0" />
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
