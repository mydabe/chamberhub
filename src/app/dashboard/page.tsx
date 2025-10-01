import {signOut} from "@/auth";


export async function SignOut() {
    "use server"
    await signOut({redirectTo:"/"})
}

export default function DashboardView() {
     return (
         <div id="main">
             <form action={SignOut}>
                 <button type="submit">
                     Sign Out
                 </button>
             </form>
         </div>
     )
}