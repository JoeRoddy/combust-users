import React from "react";
import { observer } from "mobx-react";

import Avatar from "../reusable/Avatar";

const UserList = observer(({ users, onUserClicked, title }) => {
  return (
    <div>
      {users &&
        Object.keys(users).map((userId, i) => {
          const user = users[userId];
          if (!user) {
            return <span />;
          }

          return (
            <div
              key={i}
              onClick={e => onUserClicked(user)}
              className="User uk-flex uk-flex-between uk-flex-nowrap uk-flex-middle"
            >
              <span className="avatarAndName">
                <Avatar src={user.iconUrl} height={30} />
                <span className="userName">{user.displayName}</span>
              </span>
              <span
                className={"isOnline " + (user.isOnline ? "online" : "offline")}
              />
            </div>
          );
        })}
    </div>
  );
});

export default UserList;
