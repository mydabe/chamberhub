import { signIn } from '@/auth'
import Link from "next/link";

export function SignIn() {
    return (
        <div className="text-center">
            {/* Sign in with Google */}
            <form
                action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: "/dashboard" });
                }}
            >
                <button
                    type="submit"
                    className="bg-sky-500 text-white font-mono px-4 py-2 rounded-md mt-20"
                >
                    Sign in with Google
                </button>
            </form>
            <Link
                className="bg-sky-500 text-white font-mono px-4 py-2 rounded-md mt-20"
                href="/cred_sign"
            >
                Sign In with E-Mail

            </Link>

        </div>
    );
}

export function CreateAccount() {
    return (
        <div className="text-center">
            <Link
                href="/signup"
                className="mt-4 text-sky-600"
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
        <div className="w-96 p-6 border rounded-lg mx-auto h-75">
            <SignIn/>
            <div className= "mt-25">
                <CreateAccount/>
            </div>
        </div>
      </div>

  );
}
