"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function SecondPage() {
  const LIMIT = 3;
  const [things, setThings] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/read?offset=${offset}&limit=${LIMIT}`);
      const data = await res.json();

      // fixed dealy for loading
      await new Promise((resolve) => setTimeout(resolve, 1700));

      setThings((prev) => [...prev, ...data.items]);
      setOffset((o) => o + LIMIT);
      setHasMore(data.hasMore);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };


  // infitine scrolling thing
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef.current, loading, hasMore]);

  return (
    <div className='flex flex-col space-y-18 py-18 mx-52'>
      <h2 className='text-4xl uppercase text-cyan-950 font-medium tracking-widest text-left border-l-8 pl-5 border-teal-600 leading-loose'>
        All things to read that we had
      </h2>

      <h3 className='-mt-20 lowercase text-cyan-800 font-medium tracking-tighter text-left pl-7 border-teal-600 leading-loose'>
        &#91;at this moment...&#93;
      </h3>

      <div className="flex flex-col space-y-8">
        {things.map((thing: any, i) => (
          <Link key={i} href={`/second/${thing.slug}`}>
            <div
              className={`${i % 2
                ? 'bg-teal-600 border-cyan-800 shadow-cyan-800 after:bg-cyan-800 after:border-b-4 after:border-l-4 after:border-teal-100'
                : 'bg-cyan-800 border-teal-600 shadow-teal-900 after:bg-teal-600 after:border-b-4 after:border-l-4 after:border-teal-100'
                } px-8 py-5 flex flex-col items-start justify-start cursor-pointer shadow-md border-l-8 tracking-wide hover:shadow-lg hover:scale-105 transition-all overflow-clip relative after:absolute after:-top-10 after:-right-10 after:content-[''] after:size-20 after:z-10`}
            >
              <h3 className={`${i % 2 ? 'text-cyan-100' : 'text-teal-300'} text-2xl`}>
                {thing.title}
              </h3>
              <span className={`${i % 2 ? 'text-cyan-50' : 'text-teal-200'} mt-1 font-thin`}>
                By ~ <span className="italic">{thing.by}</span>
              </span>
              <p className={`${i % 2 ? 'text-cyan-200' : 'text-teal-400'} mt-3 line-clamp-2`}>
                {thing.content}
              </p>
            </div>
          </Link>
        ))}

        {/* loading display text */}
        <div ref={loaderRef} className="h-16 flex justify-center items-center">
          {loading && <span className="text-cyan-900 tracking-widest animate-pulse ">Loading...</span>}
        </div>

        {!hasMore && (
          <p className="text-center text-cyan-900 mt-10 tracking-widest">these are all the things to read we had...</p>
        )}
      </div>
    </div>
  );
}
