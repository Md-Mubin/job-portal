import { cn } from "@/app/lib/utils"
import SideNavbar from "../Navbar/SideNavbar"
import Navbar from "../Navbar/Navbar"
import Container from "./Container"

const MainLayout = ({ className, children }) => {
    return (
        <section
            className={cn("flex w-full h-screen", className)}
        >
            <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
                <h1 className="p-4 text-4xl border-b border-[#ffffff44]">Job Portal</h1>
                <SideNavbar />
            </aside>

            <Container>
                <main className="pt-10">
                    {children}
                </main>
            </Container>
        </section>
    )
}

export default MainLayout