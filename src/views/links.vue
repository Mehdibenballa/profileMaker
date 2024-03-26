<script setup>
import LinksIcon from "../components/icons/linksIcon.vue";
import profile from "../components/icons/profile.vue";
import navM from "../components/nav.vue";
import flesh from "../components/icons/flesh.vue";
import { ref } from "vue";
import axios from "axios";

import githubIcon from "../components/icons/github.vue";
import youtubeIcon from "../components/icons/youtube.vue";
import linkedinIcon from "../components/icons/linkedin.vue";

import { useTodoStore } from "../store";
const store = useTodoStore();

const platform = [
  {
    name: "Github",
    icon: githubIcon,
  },
  {
    name: "Youtube",
    icon: youtubeIcon,
  },
  {
    name: "Linkedin",
    icon: linkedinIcon,
  },
];
const selectBox = ref(JSON.parse(store.user?.links || "[]") || []);
const showMsg = ref(false);

const addItem = () => {
  selectBox.value.push({
    name: "",
    url: "",
    isShowing: false,
  });
  localStorage.setItem("user", JSON.stringify(store.user));
};

const removeArr = (index) => {
  selectBox.value.splice(index, 1);
};
const toggle = (index) => {
  if (!selectBox.value[index].isShowing) {
    selectBox.value[index].isShowing = true;
  } else {
    selectBox.value[index].isShowing = false;
  }
};
const selectedPlatform = (i, name) => {
  selectBox.value[i].name = name;
  selectBox.value[i].isShowing = false;
};
const saveButton = async () => {
  const resp = await axios.patch(
    `http://localhost:3333/api/private/users/${store.user.id}`,
    {
      links: JSON.stringify(selectBox.value),
    },
    {
      headers: {
        Authorization: `Bearer ${store.user.accessToken}`,
      },
    }
  );
  if (resp.data?.user?.id) {
    store.updateSelect(selectBox.value);
    showMsg.value = true;
    setTimeout(() => {
      showMsg.value = false;
    }, 3000);
  }
};

const getIcon = (name) => platform.find((item) => item.name === name).icon;
</script>

<template>
  <section class="conatiner">
    <navM />
    <div
      class="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:grid-cols-3 mt-8 rounded-lg"
    >
      <div class="bg-white flex items-center justify-center rounded-lg">
        <div class="p-12">
          <profile :selectBox="selectBox" class="hidden lg:flex" />
        </div>
      </div>
      <div class="xl:col-span-2 px-6 pb-6 pt-6 sm:px-10 sm:pt-10 bg-white">
        <h1 class="text-2xl font-bold text-dark-gray sm:text-[2rem]">
          Customize your links
        </h1>
        <p class="sm:mt-4">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          @click="addItem()"
          type="button"
          class="inline-flex h-[46px] w-full items-center justify-center rounded-lg border border-purple bg-white px-4 font-semibold text-purple shadow-sm transition duration-150 ease-in-out hover:bg-light-purple focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 mt-10"
        >
          + Add new link
        </button>
        <div
          v-if="selectBox.length === 0"
          class="grid place-items-center rounded-xl bg-light-gray lg:px-10 mt-8 p-6 h-[400px]"
        >
          <div>
            <img
              src="../assets/illustration-empty.svg"
              width="251"
              height="161"
              alt=""
              class="mx-auto"
            />
            <h2
              class="mt-6 text-2xl font-bold text-dark-gray sm:mt-10 sm:text-[2rem] text-center"
            >
              Let's get you started
            </h2>
            <p class="mt-6 sm:max-w-[488px] text-center">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We're here to help
              you share your profiles with everyone!
            </p>
          </div>
        </div>
        <div v-else class="overflow-y-auto h-[400px] mt-6">
          <div
            class="rounded-xl bg-light-gray p-5 mb-6"
            v-for="(box, index) in selectBox"
            :key="index"
          >
            <div class="flex justify-between items-center">
              <p class="font-bold">Link# {{ index + 1 }}</p>
              <button @click="removeArr(index)" class="text-right">
                Remove
              </button>
            </div>
            <div class="col-span-full mt-3">
              <div class="relative">
                <h2 class="text-xs">Platform</h2>
                <button
                  class="relative mt-1 flex h-12 w-full items-center justify-between rounded-lg border border-borders bg-white px-4 cursor-pointer"
                  @click="toggle(index)"
                >
                  <div v-if="box.name" class="flex items-center gap-4">
                    <component
                      class="text-normal-gray"
                      :is="getIcon(box.name)"
                    />
                    <h2>{{ box.name }}</h2>
                  </div>
                  <h2 v-else class="text-dark-gray/50">Select platform</h2>
                  <flesh />
                </button>
                <ul
                  v-show="box.isShowing"
                  class="absolute left-0 right-0 top-full z-10 mt-2 grid max-h-[195px] gap-[1px] overflow-hidden overflow-y-auto rounded-lg bg-light-gray shadow-lg"
                  tabindex="-1"
                >
                  <li v-for="(palt, i) in platform" :key="i" class="bg-white">
                    <button
                      @click="selectedPlatform(index, palt.name)"
                      type="button"
                      class="flex h-full w-full items-center gap-x-3 px-4 py-3 text-left"
                    >
                      <component :is="palt.icon" class="text-normal-gray" />
                      {{ palt.name }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-span-full mt-3">
              <div class="mt-1 block w-full">
                <label class="block text-xs text-dark-gray" for="link_0">
                  <span>Link</span>
                </label>
                <div class="relative mt-2 flex items-center border-0 p-0">
                  <LinksIcon
                    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-normal-gray"
                  />
                  <input
                    type="text"
                    class="h-12 w-full rounded-lg border border-borders placeholder:text-dark-gray/50 focus:border-indigo-500 focus:ring-indigo-500 pl-11 pr-4"
                    placeholder="e.g. https://www.github.com/mehdibenballa"
                    id="link_0"
                    v-model="box.url"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="rounded-bl-xl rounded-br-xl border-t border-borders bg-white px-6 pb-4 pt-6 mt-8 sm:px-10 sm:pb-6 sm:text-right"
        >
          <button
            :disabled="selectBox.length <= 0"
            @click="saveButton"
            type="submit"
            class="inline-flex h-[46px] w-full items-center justify-center rounded-lg border border-transparent bg-purple px-7 font-semibold text-white transition duration-150 ease-in-out hover:bg-purple-hover-color disabled:bg-purple-hover-color focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-purple-hover-color sm:w-28"
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
