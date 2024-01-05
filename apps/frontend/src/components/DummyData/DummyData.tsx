'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { dummyDataApi } from 'api-client';
import { useEffect, useState } from 'react';

import useScrollbar from 'src/hooks/useScrollbar';

import { BrowseProfileCard } from '../cards/BrowseProfileCard';

import type { DummyDataProps } from './types';

export default function DummyData({ initialData }: DummyDataProps) {
  const limit = 10;
  //shifted because initial data is first 10 profiles
  const [offset, setOffset] = useState(10);

  const fetchProfiles = async () => {
    const { data } = await dummyDataApi.getData({ limit, offset }).throwOnError();
    setOffset((x) => x + limit);

    return data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['profiles'],
    queryFn: fetchProfiles,
    staleTime: Infinity, //to prevent refetch initial data
    initialPageParam: 0,
    initialData: () => {
      return { pageParams: [null], pages: [initialData] };
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === limit ? allPages.length * limit : undefined,
  });

  if (error) {
    throw error;
  }

  const { scrollPercentage } = useScrollbar();

  useEffect(() => {
    const handleScroll = async () => {
      if (scrollPercentage === 100 && hasNextPage) {
        await fetchNextPage();
      }
    };
    void handleScroll();
  }, [scrollPercentage, hasNextPage, fetchNextPage]);

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 w-full">
        Load dummy data:
      </h2>
      <div className="w-full max-w-[1000px] space-y-5">
        {data.pages.map((page) =>
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
