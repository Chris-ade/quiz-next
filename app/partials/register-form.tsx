"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) => {
  const [pending, setPending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const { registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const nameRegex = /^[A-Za-z]{2,}(?: [A-Za-z]{2,})+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$#!%*?&]{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const newErrors: typeof errors = {};

    if (!name) newErrors.name = "Enter your name";
    else if (!nameRegex.test(name))
      newErrors.name =
        "Your name can only contain letters (at least 2 characters long).";

    if (!email) newErrors.email = "Enter an e-mail address";
    else if (!emailRegex.test(email))
      newErrors.email = "Please enter a valid e-mail address";

    if (!password) newErrors.password = "Enter a password";
    else if (!passwordRegex.test(password))
      newErrors.password =
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await registerUser(name, email, password);
      } finally {
        setPending(false);
      }
    } else {
      setPending(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Don't have an account ? Register{" "}
          <i className="far fa-arrow-down ml-1"></i>
        </p>
      </div>

      <div className="grid">
        <div className="grid my-3">
          <Input
            id="name"
            type="text"
            placeholder="Full name"
            className="h-12"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="grid my-3">
          <Input
            id="email"
            type="email"
            placeholder="E-mail"
            className="h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="grid my-3">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="mb-2 inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
            onClick={togglePassword}
          >
            <i
              className={`fad ${
                showPassword ? "fa-lock" : "fa-lock-open"
              } mr-2`}
            />
            {showPassword ? "Hide" : "Show"} password
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button
          className="w-full hover:outline-primary hover:text-primary"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Register"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <i className="far fa-arrow-right ml-2 mr-3"></i>
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
