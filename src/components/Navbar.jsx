"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  console.log(user);

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header className="top-0 z-50 w-full bg-black px-3 py-4 sm:px-4 sm:py-5">
      <nav className="relative mx-auto max-w-7xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,.25),transparent_50%)]" />

        <div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.05)] sm:rounded-3xl sm:px-6 sm:py-3.5">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/logo.png"
              alt="HireLoop"
              width={180}
              height={50}
              priority
              className="h-7 w-auto sm:h-8 md:h-9"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-white/80 hover:text-white"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-5 w-px bg-white/20" />

            {/* LOADING STATE */}
            {isPending && (
              <span className="text-white/50 text-sm">Loading...</span>
            )}

            {/* NOT LOGGED IN */}
            {!isPending && !user && (
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Sign In
                </Link>

                <Link href="/signup">
                  <Button
                    radius="lg"
                    size="sm"
                    className="bg-linear-to-r from-indigo-500 to-violet-600 px-6 text-sm text-white rounded-sm"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* LOGGED IN USER */}
            {!isPending && user && (
              <div className="flex items-center gap-2">
                <Image
                  src={user.image || "/default.png"}
                  alt="user"
                  width={42}
                  height={42}
                  className="rounded-full"
                />
                <span className="text-white text-sm">{user.name}</span>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white lg:hidden"
          >
            {isOpen ? <HiX size={26} /> : <HiOutlineMenuAlt3 size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen ? "max-h-[28rem] mt-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-4 sm:rounded-3xl sm:p-5">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-white/10" />

              {!user ? (
                <>
                  <Link href="/signin" onClick={() => setIsOpen(false)}>
                    <span className="text-indigo-400">Sign In</span>
                  </Link>

                  <Button
                    as={Link}
                    href="/signup"
                    onPress={() => setIsOpen(false)}
                    className="w-full bg-linear-to-r from-indigo-500 to-violet-600 text-white"
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <Image
                    src={user.image || "/default.png"}
                    width={30}
                    height={30}
                    className="rounded-full"
                    alt="user"
                  />
                  <span>{user.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
