import React from "react";
import { observer } from "mobx-react";

import Form from "../reusable/Form";
import userStore from "../../stores/UserStore";

const fields = {
  iconUrl: "image"
};

const UpdateUser = observer(({ history }) => {
  const user = userStore.user;

  const routeToProfile = () => {
    history.push("/profile/" + userStore.userId);
  };

  const handleSubmit = formData => {
    fields &&
      Object.keys(formData).forEach(field => {
        const val = formData[field];
        field = field === "profilePic" ? "iconUrl" : field;
        if (val !== null && typeof val !== "undefined") {
          debugger;
          const val = formData[field] || null;
          user[field] = val;
        }
      });
    user.save();
    routeToProfile();
  };

  return user ? (
    <div className="Updateuser uk-flex uk-flex-center uk-padding">
      <Form
        fields={fields}
        defaultValues={user}
        onSubmit={handleSubmit}
        onCancel={routeToProfile}
        title="Update User"
        submitText="Save Info"
      />
    </div>
  ) : (
    <span />
  );
});

export default UpdateUser;
