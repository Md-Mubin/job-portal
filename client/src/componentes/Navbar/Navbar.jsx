import { apiFetch } from "@/services/apiFetch";
import { CircleUserRound } from "lucide-react"
import { cookies } from "next/headers";

const Navbar = async () => {
    const cookieStore = await cookies();
    const user = await apiFetch("/auth/self", { method: "GET", cookies: cookieStore });

    return (
        <nav className="flex flex-col items-end py-2 text-center cursor-pointer">
            <CircleUserRound strokeWidth={1.2} size={40} />
            Login
        </nav>
    )
}

export default Navbar