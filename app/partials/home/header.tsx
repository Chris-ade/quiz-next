import { useAuth } from "@/app/context/AuthContext";
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import UserAvatar from "./avatar";
import PrivateRoute from "@/app/utils/PrivateRoute";
import Link from "next/link";

const Header = (): React.ReactNode => {
  const { user, logoutUser } = useAuth();

  return (
    <PrivateRoute>
      <header className="pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12">
              <Link
                href="/home"
                className="flex items-center gap-2 font-medium"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <i className="fad fa-comments-alt" />
                </div>
                Quizzify
              </Link>
              <div className="hidden md:flex md:gap-x-6">
                <Link
                  className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/leaderboard"
                >
                  <i className="fad fa-star mr-2" />
                  Leaderboard
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              {user && (
                <>
                  <div className="hidden md:block">
                    <a
                      className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                      onClick={() => logoutUser()}
                    >
                      <i className="far fa-sign-out mr-1" /> Logout
                    </a>
                  </div>
                  <UserAvatar name={user.name} />
                  <div className="-mr-1 md:hidden">
                    <Popover>
                      <PopoverButton className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden">
                        <i className="far fa-bars overflow-visible stroke-slate-700 text-[22px] outline-none border-none"></i>
                      </PopoverButton>
                      <PopoverBackdrop
                        className="fixed inset-0 bg-slate-300/50 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
                        transition
                      />
                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
                      >
                        <Link
                          className="block w-full p-2 cursor-pointer"
                          href="/leaderboard"
                        >
                          <i className="fad fa-star mr-2" /> Leaderboard
                        </Link>
                        <a
                          className="block w-full p-2 cursor-pointer"
                          onClick={() => logoutUser()}
                        >
                          <i className="fad fa-sign-out mr-4" />
                          Logout
                        </a>
                      </PopoverPanel>
                    </Popover>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </PrivateRoute>
  );
};

export default Header;
