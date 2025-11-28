import AdminProfile from '@/componentes/ProfilePageComponents/AdminProfile';
import EmployerProfile from '@/componentes/ProfilePageComponents/EmployerProfile';
import JobSeekerProfile from '@/componentes/ProfilePageComponents/JobSeekerProfile';
import CommonHeader from '@/componentes/reuseable/CommonHeader';
import { apiFetch } from '@/services/apiFetch';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const page = async () => {
    const cookieStore = await cookies();
    const user = await apiFetch("/auth/self", { method: "GET", cookies: cookieStore });
    console.log(user)
    if (user.err) return redirect("/login")

    return (
        <>
            <CommonHeader headerName={"Profile"} />

            {
                user.role === "jobSeeker" && (
                    <JobSeekerProfile user={user} />
                )
            }

            {
                user.role === "employer" && (
                    <EmployerProfile user={user} />
                )
            }

            {
                user.role === "admin" && (
                    <AdminProfile user={user} />
                )
            }
        </>
    )
}

export default page