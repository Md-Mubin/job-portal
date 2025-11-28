import { cn } from "@/app/lib/utils"

const Container = ({ children, className, ...props }) => {
    return (
        <div
            className={cn('container mx-auto', className)}
            {...props}
        >
            {children}
        </div>
    )
}

export default Container