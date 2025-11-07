import Link from "next/link"
import fs from "fs";
import path from "path";

const FirstPage = () => {

    const dataDir = path.join(process.cwd(), "reading-things");
    const files = fs.readdirSync(dataDir);

    const things = files.map((fileName) => {
        const filePath = path.join(dataDir, fileName);
        const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));

        return {
            slug: fileName.replace(".json", ""),
            ...fileData,
        };
    });

    const shuffle = things.sort(() => 0.5 - Math.random());
    let shuffled = shuffle.slice(0, 3);
    console.log(shuffled)

    return (
        <div className='flex flex-col space-y-14 pt-18 mx-52'>
            <h2 className='text-4xl uppercase text-cyan-950 font-medium tracking-widest text-left border-l-8 pl-5 border-teal-600 leading-loose'>Some things to read</h2>
            <h3 className='-mt-18 lowercase text-cyan-800 font-medium tracking-tighter text-left pl-7 border-teal-600 leading-loose'>&#91;some more things to read on second...&#93;</h3>
            <div className="flex flex-col space-y-8">
                {shuffled.map((thing, i) => {
                    return (
                        <Link key={i} href={`/second/${thing.urlLink}`}>
                            <div className={`${i % 2 ? 'bg-teal-600 border-cyan-800 shadow-cyan-800 after:bg-cyan-800 after:border-b-4 after:border-l-4 after:border-teal-100' : 'bg-cyan-800 border-teal-600 shadow-teal-900 after:bg-teal-600 after:border-b-4 after:border-l-4 after:border-teal-100'} px-8 py-5 flex flex-col items-start justify-start cursor-pointer shadow-md shadow-teal-900 border-l-8 tracking-wide hover:shadow-lg hover:scale-105 transition-all overflow-clip relative after:absolute after:-top-10 after:-right-10 after:content-[''] after:size-20 after:z-10  `}>
                                <h3 className={`${i % 2 ? 'text-cyan-100' : 'text-teal-300'}  text-2xl`}>{thing.title}</h3>
                                <span className={`${i % 2 ? 'text-cyan-50' : 'text-teal-200'} mt-1 font-thin `}>By ~ <span className="italic">{thing.by}</span></span>
                                <p className={`${i % 2 ? 'text-cyan-200' : 'text-teal-400'} mt-3  line-clamp-2`}>{thing.content}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default FirstPage
