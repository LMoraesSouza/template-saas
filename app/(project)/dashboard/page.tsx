import { handleAuth } from "@/app/actions/handle-auth"
import { auth } from "@/app/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Dashboard () {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    return <div>
        Protected Dashboard
        <p>
            Email do usuário: {session?.user?.email ? session?.user?.email : "Usuário não está logado!"}
        </p>
        {session?.user?.email &&
            <form action={handleAuth}>
                <button 
                    className="border rounded-md px-2 py-1 cursor-pointer"
                    type="submit"    
                >
                    Logout
                </button>
            </form>
        }
        <Link href='/payments'>
            Pagamentos
        </Link>
    </div>
}