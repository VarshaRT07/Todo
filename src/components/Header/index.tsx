"use client";

import { Avatar } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  {
    label: "Home",
    href: "/home",
    type: "link",
  },
  {
    label: "Plans",
    href: "/plans",
    type: "link",
  },
  {
    label: "Completed",
    href: "/taxonomy",
    type: "link",
  },
  {
    label: "Sign Out",
    href: "/api/auth/signout",
    type: "link",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [status, setStatus] = useState(false);
  const [profileStatus, setProfileStatus] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setProfileStatus(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  return (
    <nav className="bg-gray-500">
      <div className="mx-auto my-auto flex flex-wrap items-center justify-between xl:p-3 p-4 lg:flex-nowrap">
        <Link prefetch={false} href="/home" className="mt-2 flex items-center ">
          TODO_PLAN
        </Link>
        <div className="justify-self-end lg:order-2">
          {session?.user?.name && (
            <div className="relative p-2" ref={menuRef}>
              <button
                type="button"
                className="mr-3 flex rounded-full bg-white text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
                id="user-menu-button"
                data-testid="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom"
                onClick={() => {
                  setProfileStatus((previousValue) => !previousValue);
                }}
              >
                <span className="sr-only">Open user menu</span>
                <Avatar src={String(session?.user?.image)} alt="user photo" />
              </button>
              <div
                className={`absolute right-0 z-[999] mt-2 ${
                  profileStatus ? "" : "hidden"
                } rounded-lg bg-white py-2 shadow-2xl`}
                id="userDropdown"
                data-testid="userDropdown"
              >
                <div className="px-4 py-1">
                  <span className="block text-sm text-black">
                    {session?.user?.name}
                  </span>
                  <span className="block truncate  text-sm text-gray-500">
                    {session?.user?.email}
                  </span>
                </div>
                <div className="px-4 py-1">
                  <button
                    onClick={() => signOut()}
                    className="rounded bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="ml-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            data-dropdown-toggle="mobile-menu-2"
            data-testid="mobile-menu-button"
            onClick={() => {
              setStatus((previousValue) => !previousValue);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`mt-1.5 ${
            status ? "" : "hidden"
          } w-full xl:mt-2 lg:items-center lg:inline-flex lg:order-1 lg:w-auto xl:w-full xl:ml-8 lg:gap-8 lg:ml-5 2xl:gap-16 lg:mr-auto 2xl:ml-12`}
          id="mobile-menu-2"
          data-testid="mobile-menu-2"
        >
          <ul className="flex flex-col bg-gray-50 lg:items-center mt-4 lg:mt-0 lg:mx-2 lg:flex-row 2xl:space-x-10 xl:space-x-6 lg:space-x-4 lg:bg-white lg:p-0">
            {navLinks.map((item, index) => (
              <li key={index}>
                {item.type === "link" && (
                  <Link
                    className={`mb-[4px] block items-center rounded bg-gray-200 p-2 xl:text-lg lg:text-base text-black lg:items-center lg:bg-transparent
                lg:text-center ${
                  pathname === item.href ? "text-blue-700" : "text-black"
                } lg:p-0`}
                    prefetch={false}
                    href={item.href}
                    aria-current="page"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
