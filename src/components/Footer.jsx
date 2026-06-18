"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Job discovery", href: "/jobs" },
        { name: "Worker AI", href: "/worker-ai" },
        { name: "Companies", href: "/companies" },
        { name: "Salary data", href: "/salary" },
      ],
    },
    {
      title: "Navigations",
      links: [
        { name: "Help center", href: "/help" },
        { name: "Career library", href: "/library" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Brand Guideline", href: "/brand" },
        { name: "Newsroom", href: "/newsroom" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-black text-white/50 border-t border-white/5 pt-16 pb-8 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Links Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4 mb-16">
          {/* Logo and Description Area */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="HireLoop"
                width={140}
                height={40}
                priority
                className="h-auto w-36"
              />
            </Link>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Dynamic Map Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold text-indigo-500 tracking-wide uppercase">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-200 block"
                    >
                      {section.name || link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Socials & Copyright Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Social Icons Container */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
            >
              <FaFacebook size={18} />
            </a>

            {/* Pinterest stylized block icon */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600/80 border border-indigo-500/50 text-white hover:bg-indigo-600 transition"
            >
              <svg
                viewBox="0 0 24 24"
                size={18}
                className="w-5 h-5 fill-current"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.41-5.96 1.41-5.96s-.36-.72-.36-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.48 0-2.87-2.06-4.87-5-4.87-3.41 0-5.41 2.56-5.41 5.2 0 1.03.4 2.14.89 2.74.1.12.11.23.08.35-.09.37-.29 1.18-.33 1.34-.05.22-.18.27-.41.16-1.51-.7-2.46-2.9-2.46-4.66 0-3.8 2.76-7.28 7.95-7.28 4.17 0 7.42 2.97 7.42 6.95 0 4.15-2.61 7.49-6.24 7.49-1.22 0-2.37-.63-2.76-1.38 0 0-.6 2.3-.75 2.87-.27 1.05-1.01 2.36-1.5 3.16C10.74 23.83 11.36 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
            >
              <LiaLinkedin size={18} />
            </a>
          </div>

          {/* Typography Bottom Line */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-xs text-white/30 text-center sm:text-right">
            <span>Copyright 2026 — Hire Loop</span>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-white transition">
                Terms & Policy
              </Link>
              <span>-</span>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
