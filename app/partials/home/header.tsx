import { useAuth } from "@/app/context/AuthContext";
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import UserAvatar from "./avatar";
import PrivateRoute from "@/app/utils/PrivateRoute";

const Header = (): React.ReactNode => {
  const { user, logoutUser } = useAuth();

  return (
    <PrivateRoute>
      <header className="pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12">
              <a href="#" className="flex items-center gap-2 font-medium">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <i className="fad fa-comments-alt" />
                </div>
                Quiz
              </a>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              {user && (
                <>
                  <div className="hidden md:block">
                    <a
                      className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                      onClick={() => logoutUser()}
                    >
                      Logout
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
                        <a className="block w-full p-2 cursor-pointer" href="#">
                          Leaderboard
                        </a>
                        <a
                          className="block w-full p-2 cursor-pointer"
                          onClick={() => logoutUser()}
                        >
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
