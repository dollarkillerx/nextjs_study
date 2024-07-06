import {ComponentPropsWithoutRef} from "react";
import {IconType} from "react-icons";

type ButtonProps = {
    icon?: IconType
    variant?: "default" | "outline" | "text" | 'primary'// 风格
} & ComponentPropsWithoutRef<'button'>
// 复用了button按钮的属性
export default function Button(
    {children,className = "",icon: Icon, variant = "default",...props}:ButtonProps)
{
    return (
        <button
            className={`transition-colors inline-flex items-center min-w-[38px] min-h-[38px] rounded px-3 py-1.5
            ${variant === "default" && "text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900"}
            ${variant === "outline" && "border border-gray-300 dark:border-gray-600 text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"}
            ${variant === "text" && "text-black dark:text-gray-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"}
            ${variant === "primary" && "bg-primary-500 text-white hover:bg-primary-600 hover:text-white shadow-sm"}
            ${className}`}
            {...props}
        >
            {Icon && <Icon className={`text-lg ${children ? "mr-1" : ""}`}/>}
            {children}
        </button>
    );
}