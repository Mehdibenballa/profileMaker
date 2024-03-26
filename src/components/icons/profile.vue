<script setup>
import githubIcon from "./github.vue";
import youtubeIcon from "./youtube.vue";
import linkedinIcon from "./linkedin.vue";
import { useTodoStore } from "../../store";
const store = useTodoStore();

const platform = [
  {
    name: "Github",
    icon: githubIcon,
    isShowing: false,
  },
  {
    name: "Youtube",
    icon: youtubeIcon,
    isShowing: false,
  },
  {
    name: "Linkedin",
    icon: linkedinIcon,
    isShowing: false,
  },
];
const getIcon = (name) => platform.find((item) => item.name === name).icon;
</script>

<template>
  <svg width="308" height="632" fill="none" viewBox="0 0 308 632">
    <path
      stroke="#737373"
      d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
    ></path>
    <path
      fill="#fff"
      stroke="#737373"
      d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
    ></path>
    <defs>
      <pattern id="avatar" x="0" y="0" height="1" width="1">
        <image
          preserveAspectRatio="xMidYMid slice"
          x="0"
          y="0"
          height="100"
          width="100"
          :xlink:href="store.user?.image"
        ></image>
      </pattern>
    </defs>
    <circle
      cx="153.5"
      cy="112"
      r="48"
      stroke="#633CFF"
      stroke-width="4"
      fill="url(#avatar)"
    ></circle>
    <foreignObject x="0" y="180" width="100%" height="32" rx="4">
      <p class="text-center font-bold">
        {{ store.user?.firstName }} {{ store.user?.lastName }}
      </p>
    </foreignObject>
    <foreignObject x="0" y="208" width="100%" height="32" rx="4">
      <p class="text-center text-xs">{{ store.user?.email }}</p>
    </foreignObject>
    <foreignObject
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
    </foreignObject>
  </svg>
</template>
