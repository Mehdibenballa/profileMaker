<script setup>
import { reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import profile from "../components/icons/profile.vue";
import message from "../components/icons/message.vue";
import defaultImage from "../components/icons/defaultImage.vue";
import navM from "../components/nav.vue";
import axios from "axios";

import { useTodoStore } from "../store";
const store = useTodoStore();

const user = reactive({
  firstName: store.user?.firstName || "",
  lastName: store.user?.lastName || "",
  email: store.user?.email || "",
  image: store.user?.image || "",
});
const showMsg = ref(false);

const previewImage = async (event) => {
  const input = event.target;
  if (input.files) {
    const form = new FormData();
    form.append("image", input.files[0]);

    const resp = await axios.post(
      "http://localhost:3333/api/private/upload",
      form,
      {
        headers: {
          Authorization: `Bearer ${store.user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    user.image = "http://localhost:3333/" + resp.data.image[0].path;
    store.userUpdate({
      image: "http://localhost:3333/" + resp.data.image[0].path,
    });
  }
};

const rules = {
  email: {
    required: helpers.withMessage("Can't be empty", required),
    email: helpers.withMessage("Please enter a valid email address", email),
  },
};

const v$ = useVuelidate(rules, user);

const validate = async () => {
  const result = await v$.value.$validate();
  if (result) {
    const resp = await axios.patch(
      `http://localhost:3333/api/private/users/${store.user.id}`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      },
      {
        headers: {
          Authorization: `Bearer ${store.user.accessToken}`,
        },
      }
    );
    if (resp.data?.user?.id) {
      store.userUpdate(user);
      showMsg.value = true;
      setTimeout(() => {
        showMsg.value = false;
      }, 3000);
    }
  }
};
</script>
<template>
  <section class="conatiner">
    <navM />
    <div
      class="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:grid-cols-3 mt-8 rounded-lg"
    >
      <div class="bg-white flex items-center justify-center rounded-lg">
        <div class="p-12">
          <profile class="hidden lg:flex" />
        </div>
      </div>
      <div class="xl:col-span-2 px-6 pb-6 pt-6 sm:px-10 sm:pt-10 bg-white">
        <h1 class="text-2xl font-bold text-dark-gray sm:text-[2rem]">
          Profile Details
        </h1>
        <p class="sm:mt-4">
          Add your details to create a personal touch to your profile.
        </p>
        <div
          class="mt-10 rounded-xl bg-light-gray p-5 md:grid md:grid-cols-[2fr_1fr_1fr] md:items-center md:gap-x-6 lg:grid-cols-1 xl:grid-cols-[2fr_1fr_1fr]"
        >
          <div>
            <label for="profile_picture">Profile picture</label>
          </div>
          <div class="relative">
            <img
              v-if="user.image"
              :src="user.image"
              alt=""
              class="rounded-xl h-48 w-full object-cover"
            />
            <label
              :class="user.image && 'absolute top-0 opacity-0 hover:opacity-50'"
              class="mt-4 grid h-48 w-48 cursor-pointer place-items-center rounded-xl bg-light-purple text-purple md:mt-0"
            >
              <input
                accept="image/*"
                @change="previewImage"
                type="file"
                class="hidden"
                id="profile_picture"
              />
              <div>
                <defaultImage />
                <p class="mt-2 font-semibold">+ Upload Image</p>
              </div>
            </label>
          </div>
          <p class="mt-6 text-xs md:mt-0 lg:mt-6 xl:mt-0">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
        <div class="rounded-xl bg-light-gray p-5 mt-6">
          <div>
            <div
              class="mt-1 block w-full items-center xl:grid xl:grid-cols-[10rem_1fr]"
            >
              <label class="block text-xs text-dark-gray" for="first_name">
                <span>First name</span>
              </label>
              <div class="relative mt-2 flex items-center border-0 p-0">
                <img
                  class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                  alt=""
                /><input
                  v-model="user.firstName"
                  type="text"
                  class="h-12 w-full rounded-lg border border-borders placeholder:text-dark-gray/50 focus:border-indigo-500 focus:ring-indigo-500 px-4"
                  placeholder=".e.g. John"
                  id="first_name"
                />
                <div class="absolute right-4" style="display: none">
                  <p class="pointer-events-auto text-sm text-red"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <div
              class="mt-1 block w-full items-center xl:grid xl:grid-cols-[10rem_1fr]"
            >
              <label class="block text-xs text-dark-gray" for="last_name"
                ><span>Last name</span></label
              >
              <div class="relative mt-2 flex items-center border-0 p-0">
                <img
                  class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                  alt=""
                /><input
                  v-model="user.lastName"
                  type="text"
                  class="h-12 w-full rounded-lg border border-borders placeholder:text-dark-gray/50 focus:border-indigo-500 focus:ring-indigo-500 px-4"
                  placeholder="e.g. Doe"
                  id="last_name"
                />
                <div class="absolute right-4" style="display: none">
                  <p class="pointer-events-auto text-sm text-red"></p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <div
              class="mt-1 block w-full items-center xl:grid xl:grid-cols-[10rem_1fr]"
            >
              <label
                :class="v$.email.$error ? 'text-red' : ''"
                class="block text-xs text-dark-gray"
                for="email"
                ><span>Email</span></label
              >
              <div class="relative mt-2 flex items-center border-0 p-0">
                <message
                  class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                />
                <input
                  :class="v$.email.$error ? 'border-red' : ''"
                  v-model="user.email"
                  type="email"
                  class="h-12 w-full rounded-lg border border-borders placeholder:text-dark-gray/50 focus:border-indigo-500 focus:ring-indigo-500 pl-11 pr-4"
                  placeholder="e.g. alex@email.com"
                  id="email"
                />
                <h2
                  v-for="error in v$.email.$errors"
                  :key="error.$uid"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-red text-sm"
                >
                  {{ error.$message }}
                </h2>
                <div class="absolute right-4" style="display: none">
                  <p class="pointer-events-auto text-sm text-red"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-8 rounded-bl-xl rounded-br-xl border-t border-borders bg-white px-6 pb-4 pt-6 sm:px-10 sm:pb-6 sm:text-right"
        >
          <button
            @click="validate"
            type="submit"
            class="inline-flex h-[46px] w-full items-center justify-center rounded-lg border border-transparent bg-purple px-7 font-semibold text-white transition duration-150 ease-in-out hover:bg-purple-hover-color focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-purple-hover-color disabled:bg-purple-hover-color sm:w-28"
          >
            Save
          </button>
          <div
            class="fixed left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded-md flex justify-center gap-4 px-8 py-2 transition-all"
            :class="showMsg ? 'bottom-4' : '-bottom-16'"
          >
            <span
              class="flex justify-center items-center bg-black text-white rounded-full w-4 h-4 mt-1"
            >
              <svg
                viewBox="0 0 24 24"
                width="10"
                height="10"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <p>Your changes have been successfully saved!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
