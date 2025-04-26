"use client";

import LoginForm from "@/app/partials/login-form";
import TextAnimator from "@/components/text-animator";
import Logo from "../partials/logo";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push("/home");
  }

  const texts = [
    "Quizzify is a modern quiz app designed to make learning fun, engaging, and rewarding.",
    1500,
    "Whether you're a student, a trivia lover, or just curious, our platform brings learning to life.",
    1500,
    "Enjoy fun and interactive quizzes based on STEM.",
    1500,
    "Get insights and stats that show how you're improving over time.",
    1500,
  ];

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative h-full justify-between">
        <div className="pt-6 bg-[#f7fafc] lg:hidden">
          <Logo centered={true} />
        </div>
        <div className="flex flex-col justify-center align-middle h-full w-full bg-[#f7fafc]">
          <h3 className="flex align-middle justify-center break-words font-bold text-[21px] my-0 mx-[30px] leading-[1.3] tracking-[-0.5px]">
            <TypeAnimation
              preRenderFirstString={true}
              sequence={texts}
              className="intro-text"
              repeat={Infinity}
              speed={60}
              omitDeletionAnimation={true}
            />
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10 mt-16 lg:mt-0">
        <div className="justify-center gap-2 md:justify-start hidden lg:flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
