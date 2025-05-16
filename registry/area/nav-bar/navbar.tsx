import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";

export function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b backdrop-blur-sm supports-[backdrop-filter]:bg-background/40">
      <div className="flex h-14 max-w-full items-center justify-between bg-primary px-10 py-8">
        <section className="flex items-center gap-4">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="AReA Logo"
              width={32}
              height={32}
              className="size-10 rounded-full bg-white/80 p-1.5 transition-all duration-300 hover:scale-110"
            />
          </Link>
          <Plus size={24} />
        </section>
        <section className="flex items-center gap-4">
          <p>Company switcher</p>
          <div className="flex items-center gap-2">
            <p>Avatar button profile</p>
          </div>
        </section>
      </div>
    </div>
  );
}
