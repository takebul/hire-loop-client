"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  Radio,
  RadioGroup,
} from "@heroui/react";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useState } from "react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const router = useRouter();

  // Form UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("seeker");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner

    const formData = new FormData(e.currentTarget);
    const { name, email, password, image } = Object.fromEntries(
      formData.entries(),
    );

    const plan = role === "seeker" ? "seeker_free" : "recruiter_free";

    const { data, error } = await authClient.signUp.email({
      name,
      image,
      email,
      password,
      role,
      plan,
      disableSignUp: true, // Auto login off
    });

    setIsLoading(false); // Stop loading spinner

    if (error) {
      console.error("Signup failed:", error.message);
      toast.error(error.message);
    } else {
      toast.success("Signup successful! Please sign in.");
      router.push(redirectTo);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <Card className="w-full max-w-md border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl p-6 sm:p-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
            Join Hire Loop
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Create your account to stay connected and up to speed.
          </p>
        </div>

        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <TextField isRequired name="name" type="text">
            <Label className="text-slate-300 font-medium text-sm">Name</Label>
            <Input
              placeholder="Enter Your Name"
              className="w-full bg-slate-800/50 border-slate-700 text-white rounded-md placeholder-slate-500"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          <TextField name="image" type="url">
            <Label className="text-slate-300 font-medium text-sm">
              Image URL
            </Label>
            <Input
              placeholder="https://example.com/avatar.jpg"
              className="w-full bg-slate-800/50 border-slate-700 text-white rounded-md placeholder-slate-500"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-slate-300 font-medium text-sm">Email</Label>
            <Input
              placeholder="john@example.com"
              className="w-full bg-slate-800/50 border-slate-700 text-white rounded-md placeholder-slate-500"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          <TextField
            isRequired
            minLength={6}
            name="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-slate-300 font-medium text-sm">
              Password
            </Label>
            <InputGroup className="flex items-center bg-slate-800/50 border border-slate-700 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 focus:outline-none px-3 py-2"
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
            <Description className="text-xs text-slate-500 mt-1 leading-normal">
              Must be at least 6 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          <div className="flex flex-col gap-4">
            <Label>Account Type</Label>
            <RadioGroup
              defaultValue="seeker"
              name="role"
              orientation="horizontal"
              onChange={(value) => setRole(value)}
            >
              <Radio value="seeker">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Seeker
                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Recruiter
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg transition-all py-2 rounded-md flex items-center justify-center gap-2"
            >
              {!isLoading && <Check className="h-4 w-4" />}
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <Button
              type="reset"
              variant="flat"
              isDisabled={isLoading}
              className="w-full text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 rounded-md py-2"
            >
              Reset Form
            </Button>
          </div>
        </Form>

        {/* Account redirect */}
        <div className="mt-6 text-center text-sm text-slate-400 border-t border-slate-800 pt-4">
          Already have an account?{" "}
          <Link
            href={`/signin?redirect=${redirectTo}`}
            className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
