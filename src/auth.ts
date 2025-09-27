import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // or "argon2"
import { createClient } from '@supabase/supabase-js';
import { z } from "zod";

export const supabase = createClient(
    "https://nhzrnivuaumqjknussat.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oenJuaXZ1YXVtcWprbnVzc2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2ODkwMDAsImV4cCI6MjA3NDI2NTAwMH0.z1kT7Ochev8TYdMl-z_1dhtnrDT3XuV_2F-uVdur2LI"
);

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Email & Password",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (raw) => {
                const creds = z
                    .object({
                        email: z.email(),
                        password: z.string().min(8),
                    })
                    .safeParse(raw);

                if (!creds.success) return null;

                const { data: users, error } = await supabase
                    .from("Profiles")
                    .select("id, email, name, password_hash")
                    .eq("email", creds.data.email)
                    .limit(1);

                if (error || !users || users.length === 0) return null;

                const user = users[0];
                if (!user.password_hash) return null;

                // 3) Verify password
                const ok = await bcrypt.compare(
                    creds.data.password,
                    user.password_hash
                );
                if (!ok) return null;

                // 4) Return minimal user object for session
                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.name ?? null,
                };
            },
        }),

        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],

    secret: process.env.AUTH_SECRET,
});

