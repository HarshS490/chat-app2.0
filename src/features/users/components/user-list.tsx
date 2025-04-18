"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { PartialUser } from "../schema";
import UserBox from "./user-box";
import { useInfiniteScroll } from "@/features/general/hooks/useInfiniteScroll";
import { getUsers } from "../actions/getUsers";
import Loading from "@/features/chats/components/Loading";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/features/general/hooks/useDebounce";
import FriendRequestModal from "./FriendRequestModal";

function UsersList() {
  const [query, setQuery] = useState<string>("");

  const debouncedValue = useDebounce<string>(query);
  const queryKey = useMemo(() => ["Users", debouncedValue], [debouncedValue]);
 
  const {
    data,
    containerRef,
    isFetchingNextPage,
    sentinelRef,
    status,
    isFetching,
  } = useInfiniteScroll({
    queryKey: queryKey,
    fetchData: ({ pageParam = 1 }) =>
      getUsers({ pageParam: pageParam as number , query:debouncedValue}),
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  });

  const flatUsers =
    useMemo(() => data?.pages.flatMap((page) => page.users), [data]) ?? [];


  useEffect(() => {
    if (status === "error") {
      toast.error("Couldn't fetch users", {
        id: "FETCH_USERS",
      });
    }
  }, [status]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
  const [modalData,setModalData] = useState<PartialUser|null>(null);
  const handleModalOpen = (data:PartialUser)=>{
    setModalData(data);
    setIsModalOpen(true);
  }
  const handleModalClose = ()=>{
    setIsModalOpen(false);
  }
  return (
    <div className="px-2">
      <div className="my-2 ">
        <Input
          type="search"
          value={query}
          placeholder="Search..."
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col lg:items-center" ref={containerRef}>
        <div>
          {flatUsers.map((item: PartialUser) => (
            <UserBox data={item} key={item.id} handleModalOpen={handleModalOpen}></UserBox>
          ))}
          <div ref={sentinelRef}></div>
        </div>
        {
          (flatUsers.length===0 && !isFetching) &&
          <p className="text-gray-500 text-sm">
            No user named &quot;{debouncedValue}&quot; found.
          </p>
        }
        <div>{(isFetchingNextPage || isFetching) && <Loading />}</div>
      </div>
      <FriendRequestModal isOpen={isModalOpen} data={modalData} handleClose={handleModalClose}/>

    </div>
  );
}

export default UsersList;
