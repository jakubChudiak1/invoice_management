import React from "react";
import { useGetUsersQuery } from "./services/userEndpoints";
import { useGetUserByIdQuery } from "./services/userEndpoints";

function App() {
  const { data: users } = useGetUsersQuery();
  const { data: user } = useGetUserByIdQuery(1);
  return (
    <>
      {user?.email}
      {users?.map((user) => (
        <p key={user.user_id}>{user.is_verified}</p>
      ))}
    </>
  );
}

export default App;
