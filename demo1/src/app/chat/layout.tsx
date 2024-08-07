import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "this is chat",
    description: "Generated by create next app",
};

export default function ChatLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='bg-amber-300 p-10 m-3'>{children}</div>
    );
}
