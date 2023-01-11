import { useState } from "react";

import AddUser from "./AddUser";
import UserList from "./UserList";

const UserManagement = (props) => {
  const [userList, setUserList] = useState([]);

  const addUsersHandler = (userName, userAge) => {
    setUserList((prev) => [
      { name: userName, age: userAge, id: Math.random().toString() },
      ...prev,
    ]);
  };

  return (
    <div>
      <AddUser onAddUser={addUsersHandler} />
      <UserList users={userList} />
    </div>
  );
};

export default UserManagement;
