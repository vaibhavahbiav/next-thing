import Link from "next/link";
import { headers } from "next/headers";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function UserPage({ params }: Props) {
    const { slug } = await params;

    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const apiUrl = `${protocol}://${host}/api/${slug}`;

    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
        return <div>No reading things found for "{slug}"</div>;
    }

    const data = await res.json();

    return (
        <div className="mx-50 py-20 text-cyan-50">
            <Link className="flex items-center justify-start w-fit ml-20 text-lg text-cyan-800 tracking-wider group space-x-2" href="/second">
                <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span><span className="group-hover:underline group-hover:underline-offset-8">back to all reading things</span>
            </Link>
            <div className="flex-col flex items-center mt-20 tracking-wider">
                <h1 className="text-5xl text-cyan-800 text-center font-bold border-l-4 border-teal-800 pl-10 leading-relaxed min-w-full">"{data.title}"</h1>
                <p className="mt-5 text-sm text-teal-600 italic ml-60">~ <span className="underline underline-offset-4">{data.by}</span></p>
                <p className="mt-36 text-cyan-700 leading-loose px-64 border-l-2 border-r-2 py-20 border-teal-800 ">{data.content}</p>
            </div>
        </div>
    );
}
