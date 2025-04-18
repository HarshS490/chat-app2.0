"use client";

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type Direction = "top" | "bottom";

interface InfiniteScrollProps<TQueryFnData, TError, TData> {
  queryKey: UseInfiniteQueryOptions<TQueryFnData, TError, TData>["queryKey"];
  fetchData: UseInfiniteQueryOptions<TQueryFnData, TError, TData>["queryFn"];
  getNextPageParam: UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData
  >["getNextPageParam"];
  direction?: Direction;
}

export function useInfiniteScroll<TQueryFnData, TError, TData>({
  queryKey,
  fetchData,
  getNextPageParam,
}: InfiniteScrollProps<TQueryFnData, TError, TData>) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status ,isFetching} =
    useInfiniteQuery({
      queryKey,
      queryFn: fetchData,
      getNextPageParam,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      initialPageParam: 1,
      retry: 3,
    });

  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const root = containerRef.current || null;
    if (!sentinel || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (enteries) => {
        const latest = enteries[enteries.length - 1];
        if (latest.isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("Fetching new data");
          fetchNextPage();
        }
      },
      {
        root,
        threshold: 0.5,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    containerRef,
    sentinelRef,
    data,
    isFetchingNextPage,
    hasNextPage,
    status,
    isFetching,
  };
}
