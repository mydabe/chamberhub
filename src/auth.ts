// auth.ts - FIXED VERSION
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createClient } from '@supabase/supabase-js';
import { z } from "zod";

export const supabase = createClient(
    "https://nhzrnivuaumqjknussat.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oenJuaXZ1YXVtcWprbnVzc2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2ODkwMDAsImV4cCI6MjA3NDI2NTAwMH0.z1kT7Ochev8TYdMl-z_1dhtnrDT3XuV_2F-uVdur2LI"
);

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // ... your credentials config
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("SignIn callback triggered", user?.email);

            if (account?.provider === "google") {
                try {
                    const { data, error } = await supabase
                        .from("Profiles")
                        .select()
                        .eq("email", user.email)
                        .maybeSingle();

                    if (error) {
                        console.error("Supabase error:", error);
                        return false; // Prevent sign in on error
                    }

                    // If user doesn't exist, create them
                    if (!data && user.email) {
                        const { error: insertError } = await supabase
                            .from("Profiles")
                            .insert({
                                email: user.email,
                                name: user.name || user.email.split('@')[0]
                            });

                        if (insertError) {
                            console.error("Insert error:", insertError);
                            return false;
                        }
                        console.log("New user created");
                    }

                    // Always return true to allow sign in
                    return true;

                } catch (error) {
                    console.error("SignIn callback error:", error);
                    return false;
                }
            }

            return true; // Allow sign in for other providers
        },

        async redirect({ url, baseUrl }) {
            console.log("Redirect callback", url);
            // Redirect to dashboard after successful sign in
            return `${baseUrl}/dashboard`;
        }
    },
    secret: process.env.AUTH_SECRET,
});