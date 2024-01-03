'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { dummyDataApi } from 'api-client';
import { useEffect, useRef } from 'react';

import { BrowseProfileCard } from '../cards/BrowseProfileCard';

export default function DummyData() {
  //const { data } = await dummyDataApi.getData().throwOnError();

  const observerTarget = useRef(null);

  const fetchMore = async ({ offset }: { offset: number }) => {
    const { data } = await dummyDataApi.getData({ offset }).throwOnError();
    return data;
  };
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['profiles'],
    queryFn: fetchMore,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length === 10 ? allPages.length * 10 : undefined;
      return nextPage;
    },
  });
  if (error) {
    throw error;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          await fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, fetchNextPage, hasNextPage]);

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 w-full">
        Load dummy data:
      </h2>
      <div className="w-full max-w-[1000px] space-y-5">
        {data?.pages.map((page) =>
          page.map((profile) => <BrowseProfileCard key={profile.userId} profile={profile} />),
        )}
        {isFetchingNextPage ? (
          <div className="w-full flex justify-center">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : null}
        <div ref={observerTarget} />
      </div>
    </>
  );
}
