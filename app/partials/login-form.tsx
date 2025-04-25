"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) => {
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    if (email.length > 0 && password.length > 0) {
      try {
        await loginUser(email, password);
      } finally {
        setPending(false);
      }
    } else {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Already have an account ? Login{" "}
          <i className="far fa-arrow-down ml-1"></i>
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Input
            id="email"
            type="email"
            placeholder="E-mail"
            className="h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="h-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          className="w-full hover:outline-primary hover:text-primary"
          disabled={pending}
        >
          {pending ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="flex items-center">
        <a
          href="#"
          className="mx-auto text-sm underline-offset-4 hover:underline"
        >
          Forgot your password?
        </a>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <i className="far fa-arrow-right ml-2 mr-3"></i>
        <Link href="/register" className="underline underline-offset-4">
          Create one
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
