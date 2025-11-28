import { apiFetch } from "@/services/apiFetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const cookieStore = await cookies();
  const user = await apiFetch("/auth/self", { method: "GET", cookies: cookieStore });
  if (!user.err) return redirect("/jobs")

  return (
    <>
      {children}
    </>
  )
}