import {ComponentPropsWithoutRef} from "react";
import {IconType} from "react-icons";

type ButtonProps = {
    icon?: IconType
    variant?: "default" | "outline" | "text" // 风格
} & ComponentPropsWithoutRef<'button'>
// 复用了button按钮的属性
export default function Button(
    {children,className = "",icon: Icon, variant = "default",...props}:ButtonProps)
{
    return (
        <button
            className={`inline-flex items-center min-w-[38px] min-h-[38px]
            ${variant === "default" && "text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200"}
            ${variant === "outline" && "border border-gray-300 dark:border-gray-600 text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200"}
            ${variant === "text" && "text-black dark:text-gray-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"}
            hover:bg-gray-800 active:bg-gray-700 border border-gray-600 
            rounded px-3 py-1.5 ${className}`} {...props}>
            {Icon && <Icon className={`text-lg ${children ? "mr-1" : ""}`}/>}
            {/*children 存在则 mr-1*/}
            {children}
        </button>
    );
}