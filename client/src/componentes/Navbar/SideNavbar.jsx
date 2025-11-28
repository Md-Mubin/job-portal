import Link from "next/link";

const SideNavbar = () => {

    const menu = [
        { label: "All Jobs", link: "/jobs" },
        { label: "Profile", link: "/profile" }
    ]

    return (
        <ul className="space-y-2 p-4">
            {menu?.map((item) => (
                <li
                    key={item.label}
                    className="rounded-sm hover:bg-gray-800 duration-200"
                >
                    <Link
                        href={item.link}
                        className="block p-2 cursor-pointer"
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default SideNavbar