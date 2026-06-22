"use client";
import { authClient } from "@/lib/auth-client";
import { LogIn } from "lucide-react"; // Nice icon for the signin action
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const SigninPage = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const router = useRouter();

  // Form UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsPasswordWrong(false); // Reset error state on new attempt

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    setIsLoading(false);

    console.log(data);

    if (error) {
      console.error("Signin failed:", error.message);

      // Check if backend specifically flags credentials/password mismatch
      if (
        error.code === "INVALID_PASSWORD" ||
        error.message.toLowerCase().includes("password")
      ) {
        setIsPasswordWrong(true);
      } else {
        toast.error(error.message || "Something went wrong.");
      }
    } else {
      toast.success("Welcome back!");
      router.push(redirectTo);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <Card className="w-full max-w-md border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl p-6 sm:p-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to your account to catch up with the hire loop.
          </p>
        </div>

        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {/* Email Field */}
          <TextField isRequired name="email" type="email">
            <Label className="text-slate-300 font-medium text-sm">
              Email Address
            </Label>
            <Input
              placeholder="john@example.com"
              className="w-full bg-slate-800/50 border-slate-700 text-white rounded-md placeholder-slate-500"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Password Field */}
          <TextField isRequired name="password">
            <Label className="text-slate-300 font-medium text-sm">
              Password
            </Label>

            {/* Conditional border color change to red if password is wrong */}
            <InputGroup
              className={`flex items-center bg-slate-800/50 border rounded-md transition-all ${
                isPasswordWrong
                  ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500"
                  : "border-slate-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
              }`}
            >
              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 focus:outline-none px-3 py-2"
                onChange={() => {
                  // Typing instantly clears the previous error indicator
                  if (isPasswordWrong) setIsPasswordWrong(false);
                }}
              />
              <Button
                variant="ghost"
                className="text-slate-400 hover:text-slate-200 min-w-10 h-full px-3 bg-transparent hover:bg-transparent border-none focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </InputGroup>

            {/* Dynamic visual flag for an incorrect password entry */}
            {isPasswordWrong && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400 bg-red-950/30 border border-red-900/50 rounded px-2.5 py-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>
                  Your password is incorrect. Please check your credentials and
                  try again.
                </span>
              </div>
            )}

            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Submit Action Block */}
          <div className="pt-2">
            <Button
              type="submit"
              // Native HeroUI loading attributes handle the dynamic spinner natively
              isLoading={isLoading}
              isDisabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg transition-all py-2 rounded-md flex items-center justify-center gap-2"
            >
              {!isLoading && <LogIn className="h-4 w-4" />}
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </Form>

        {/* Dynamic Navigation Toggle */}
        <div className="mt-6 text-center text-sm text-slate-400 border-t border-slate-800 pt-4">
          Don't have an account yet?{" "}
          <Link
            href={`/signup?redirect=${redirectTo}`}
            className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-colors"
          >
            Signup
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SigninPage;
