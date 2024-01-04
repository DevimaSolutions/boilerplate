'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { dummyDataApi } from 'api-client';
import { useEffect } from 'react';

import { BrowseProfileCard } from '../cards/BrowseProfileCard';

import type { DummyDataDto } from 'api-client';

export default function DummyData() {
  const limit = 10;

  const fetchProfiles = async () => {
    const { data } = await dummyDataApi.getData({ limit }).throwOnError();
    return data as DummyDataDto[];
  };

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['profiles'],
    queryFn: fetchProfiles,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length === limit ? allPages.length * limit : undefined;
      return nextPage;
    },
  });

  if (error) {
    throw error;
  }

  useEffect(() => {
    async function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        hasNextPage
      ) {
        await fetchNextPage();
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, fetchNextPage]);

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
      </div>
    </>
  );
}
