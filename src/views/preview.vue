<script setup>
import { useTodoStore } from "../store";
import { RouterLink } from "vue-router";
import github from "../components/icons/github.vue";
import linkedin from "../components/icons/linkedin.vue";
import youtube from "../components/icons/youtube.vue";
const store = useTodoStore();

const platform = [
  {
    name: "Github",
    icon: github,
    isShowing: false,
  },
  {
    name: "Youtube",
    icon: youtube,
    isShowing: false,
  },
  {
    name: "Linkedin",
    icon: linkedin,
    isShowing: false,
  },
];
const getIcon = (name) => platform.find((item) => item.name === name).icon;
</script>

<template>
  <section class="bg-purple">
    <nav class="sm:px-6 sm:pt-6">
      <div
        class="relative flex justify-between gap-x-4 p-4 sm:rounded-xl sm:bg-white"
      >
        <router-link
          to="/links"
          class="inline-flex h-[46px] w-full items-center justify-center rounded-lg border border-purple bg-white px-7 font-semibold text-purple shadow-sm transition duration-150 ease-in-out hover:bg-light-purple focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 sm:w-max"
          href="/"
        >
          Back to Editor
        </router-link>
        <button
          type="button"
          class="inline-flex h-[46px] w-full items-center justify-center rounded-lg border border-transparent bg-purple px-7 font-semibold text-white transition duration-150 ease-in-out hover:bg-purple-hover-color focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-purple-hover-color disabled:bg-purple-hover-color sm:w-max"
        >
          Share Link
        </button>
      </div>
    </nav>
    <main
      class="relative mx-auto mt-14 rounded-xl px-16 pb-10 text-center sm:mt-32 sm:w-[349px] sm:bg-white sm:py-12 sm:shadow-lg"
    >
      <img
        class="inline-block aspect-square rounded-full border-4 border-purple object-cover"
        :src="store.user?.image"
        width="112"
        height="112"
        alt="Profile picture"
      />
      <h1 class="mt-6 text-[2rem] font-bold text-dark-gray">
        {{ store.user.firstName }} {{ store.user.lastName }}
      </h1>
      <p class="mt-2">{{ store.user.email }}</p>
      <div
        class="mt-6"
        v-for="(box, index) in JSON.parse(store.user.links || '[]')"
        :key="index"
        width="100%"
        height="44"
        x="0"
        :y="278 + 65 * index"
        rx="4"
      >
        <a
          :href="box.url"
          class="flex justify-between items-center rounded-lg px-4 gap-x-2 text-left text-white mx-auto h-[44px] w-[237px]"
          target="_blank"
          rel="noopener noreferrer"
          :class="
            box.name === 'Github'
              ? 'bg-black text-white'
              : box.name === 'Youtube'
              ? 'bg-red text-white'
              : box.name === 'Linkedin'
              ? 'bg-[#0f75d9] text-white'
              : 'bg-normal-gray'
          "
        >
          <div v-if="box.name" class="flex items-center gap-4">
            <component :is="getIcon(box.name)" />
            <h2>{{ box.name }}</h2>
          </div>
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
            ></path>
          </svg>
        </a>
      </div>
    </main>
  </section>
</template>
