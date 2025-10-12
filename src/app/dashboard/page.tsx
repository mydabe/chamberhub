import {signOut} from "@/auth";


export async function SignOut() {
    "use server"
    await signOut({redirectTo:"/"})
}

export default function DashboardView() {
     return (
         <div id="main" className="flex">
             <div className="border w-32 h-32 ">

             </div>
             <form action={SignOut}>
                 <button type="submit">
                     Sign Out
                 </button>
             </form>


         </div>
     )
}