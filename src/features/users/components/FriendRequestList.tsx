import React from "react";
import { FullFriendRequest } from "../schema";
import FriendRequestBox from "./FriendRequestBox";

type Props = {
  data: FullFriendRequest[];
};

function FriendRequestList({ data }: Props) {
  return (
    <div className="p-2 w-full flex flex-col gap-2">
      {data.map((request) => (
        <FriendRequestBox key={request.id} request={request}></FriendRequestBox>
      ))}
    </div>
  );
}


export default FriendRequestList;
