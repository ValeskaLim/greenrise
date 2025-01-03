import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Toaster } from "@/Components/ui/sonner";
import { hasRole } from "@/helpers";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user;
  const success: any = usePage().props.success;

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <Link
                  href="/"
                  className="flex items-center space-x-3 hover:text-green-600"
                >
                  <span className="text-2xl font-light tracking-wide text-gray-800 dark:text-gray-200 transition duration-300">
                    GreenRise
                  </span>
                  <div className="relative w-6 h-6 transition duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 20h10" />
                      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
                    </svg>
                  </div>
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                  prefetch
                  href={route("dashboard")}
                  active={route().current("dashboard")}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  prefetch
                  href={route("event.index")}
                  active={route().current("event.*")}
                >
                  Events
                </NavLink>
                {hasRole(user, "admin") && (
                  <NavLink
                    prefetch
                    href={route("admin.index")}
                    active={route().current("admin.index")}
                  >
                    Admin
                  </NavLink>
                )}
              </div>
            </div>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
              <div className="relative ms-3">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.image || "/default-profile.jpg"}
                        alt={user.name}
                      />
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        {user.name}

                        <svg
                          className="-me-0.5 ms-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link prefetch href={route("profile.edit")}>
                      Profile
                    </Dropdown.Link>
                    <Dropdown.Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      className="text-red-600 hover:text-red-500"
                    >
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown(
                    (previousState) => !previousState
                  )
                }
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
          }
        >
          <div className="space-y-1 pb-3 pt-2">
            <ResponsiveNavLink
              prefetch
              href={route("dashboard")}
              active={route().current("dashboard")}
            >
              Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink
              prefetch
              href={route("event.index")}
              active={route().current("event.*")}
            >
              Events
            </ResponsiveNavLink>
            {hasRole(user, "admin") && (
              <ResponsiveNavLink
                prefetch
                href={route("admin.index")}
                active={route().current("admin.index")}
              >
                Admin
              </ResponsiveNavLink>
            )}
          </div>

          <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
            <div className="px-4 flex items-center">
              <div className="shrink-0 mr-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={user.image || "/default-profile.jpg"}
                  alt={user.name}
                />
              </div>
              <div>
                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink prefetch href={route("profile.edit")}>
                Profile
              </ResponsiveNavLink>
              <ResponsiveNavLink
                method="post"
                href={route("logout")}
                as="button"
              >
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white shadow dark:bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main className="p-4">{children}</main>
      <Toaster position="top-center" duration={2000} />
    </div>
  );
}
