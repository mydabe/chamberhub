import { signIn } from '@/auth'

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <button type="submit">Sign in with Google</button>
        </form>
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
        </div>

      </div>

  );
}
