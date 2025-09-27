"use client"
import React from "react";
import { useState } from "react";
import {signIn, supabase} from "@/auth";
import bcrypt from "bcryptjs";



type AuthProps = {
    value: string;                          // controlled value
    onChange: (value: string) => void;      // callback when input changes
    placeholder?: string;                   // optional placeholder
    required?: boolean;
};

export function EmailInput({
                               value,
                               onChange,
                               placeholder = "Enter your email:",
                               required = true,
                           }: AuthProps) {

    return (
        <input
            type="email"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="w-full border rounded-md px-3 py-2 text-center focus:outline-none focus:ring focus:ring-sky-500"
        />
    );
}
export function PasswordInput({
                               value,
                               onChange,
                               placeholder = "Enter your password:",
                               required = true,
                           }: AuthProps) {

    return (
        <input
            type="password"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="w-full border rounded-md px-3 py-2 text-center focus:outline-none focus:ring focus:ring-sky-500"
        />
    );
}


export default function SignUpScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await signIn("credentials",  {redirectTo: "/dashboard", email: email, password: password});
    }
    return (
        <div>
            <h1 className='text-center font-bold text-3xl mt-50'>
                Sign Up
            </h1>
            <h3 className='text-center'>
                Enter your email and password below:
            </h3>
            <form
                className="w-96 p-6 border  text-center rounded-lg mx-auto h-75"
                onSubmit={handleSubmit}
            >
                <div className="mt-20 text-center">
                    <EmailInput value={email} onChange={setEmail}/>
                    <PasswordInput value={password} onChange={setPassword}/>
                </div>
            </form>
        </div>
    );
}