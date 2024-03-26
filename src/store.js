import { defineStore } from "pinia";

export const useTodoStore = defineStore("store", {
  state: () => ({
    // get user from localstorage if exist if not make it null

    user: JSON.parse(localStorage.getItem("user") || null),
  }),
  actions: {
    loginUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    userUpdate(item) {
      const newUser = this.user;
      newUser.firstName = item?.firstName || "";
      newUser.lastName = item?.lastName || "";
      newUser.image = item?.image || "";
      newUser.email = item?.email || "";
      this.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
    },
    updateSelect(selct) {
      const newUser = this.user;
      newUser.links = JSON.stringify(selct);
      this.user = newUser;
      localStorage.setItem("user", JSON.stringify(newUser));
    },
  },
});
