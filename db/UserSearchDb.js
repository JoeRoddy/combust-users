import firebase from "firebase";
import userStore from "../stores/UserStore";

//This is temporary.  You must replace this with a separate
//search solution in order to scale
class UserSearchDb {
  loaded = false;

  loadUserData = () => {
    this.loaded = true;
    firebase
      .database()
      .ref("users/publicInfo")
      .once("value")
      .then(snap => {
        let userData = snap.val();
        userData &&
          Object.keys(userData).forEach(uid => {
            userStore.getUserById(uid);
          });
      });
  };

  searchByField(query, field) {
    if (!this.loaded) {
      this.loadUserData();
    }
    if (!query) {
      return [];
    }
    const users = userStore.usersMap.values();
    return users.filter(user => {
      return (
        user.id !== userStore.userId &&
        (!user[field] ||
          user[field].toUpperCase().includes(query.toUpperCase()))
      );
    });
  }
}

const userSearchDb = new UserSearchDb();
export default userSearchDb;
