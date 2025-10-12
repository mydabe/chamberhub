// components/SignIn.tsx - SERVER ACTION VERSION
import { signIn } from '@/auth';
import Image from "next/image";
import Link from "next/link";

async function handleGoogleSignIn() {
    "use server";
    await signIn("google", { redirectTo: "/dashboard" });
}

export function SignIn() {
    return (
            <form action={handleGoogleSignIn}>
                <button
                    type="submit"
                    className="flex items-center justify-center gap-3 bg-sky-500 text-white font-mono px-6 py-3 rounded-md mt-20 mx-auto hover:bg-sky-600 transition-colors"
                >
                    <Image
                        width={50}
                        height={50}
                        alt="Google Logo"
                        src="/google_logo.jpg"
                        className="flex-shrink-0"
                    />
                    <span>Sign in with Google</span>
                </button>
            </form>
    );
}

export function CredSignIn() {
    return (
        <Link
        className="bg-sky-500 text-white font-mono px-4 py-2 rounded-md mt-40"
        href="/cred_sign"
        >
        Sign In with E-Mail
        </Link>
    )

}

export function CreateAccount() {
    return (
        <div className="text-center">
            <Link
                href="/signup"
                className=" mt-20 text-sky-600"
            >
                Create an Account
            </Link>
        </div>
    )
}


export default function LoginScreen() {
  return (
      <div>
        <h1 className='text-center font-bold text-3xl mt-50'>
          Welcome to ScoreHub!
        </h1>
        <h3 className='text-center'>
          The musician&#39;s personal workspace.
        </h3>
        <div className="text-center w-96 p-6 border rounded-lg mx-auto h-75">
            <SignIn/>
        </div>
        <div className="text-center -mt-30">
            <CredSignIn/>
        </div>
        <div className= "mt-25">
            <CreateAccount/>
        </div>
      </div>

  );
}
