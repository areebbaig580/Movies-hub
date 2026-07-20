import React from "react";
import {
  FaEnvelope,
  FaInstagram,
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Email",
    icon: FaEnvelope,
    href: "mailto:areebbaig580@gmail.com",
    label: "areebbaig580@gmail.com",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://instagram.com/axreeb._",
    label: "@axreeb._",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/areebbaig580",
    label: "areebbaig580",
  },
];

const projects = [
  {
    name: "Pomoductivity Pro",
    href: "https://pomoductivity-pro.vercel.app/",
  },
  {
    name: "Habitly",
    href: "https://habitly-areeb-baig.vercel.app/",
  },
  {
    name: "Expenso",
    href: "https://expenso-areeb-baig.vercel.app/",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0c0c0c] text-gray-300 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand / About */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FaCode className="w-5 h-5 text-white" />
              <span className="text-white text-lg font-semibold tracking-tight">
                Areeb Baig
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Building clean, functional web apps — one project at a time.
            </p>
          </div>

          {/* Contact / Socials */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-1">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              {socialLinks.map(({ name, icon: Icon, href, label }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 shrink-0 group-hover:text-white transition-colors duration-200" />
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-1">
              Projects
            </h3>
            <ul className="flex flex-col gap-3">
              {projects.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="truncate">{name}</span>
                    <FaExternalLinkAlt className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Areeb Baig. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <span className="text-white">React</span> &amp;{" "}
            <span className="text-white">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}