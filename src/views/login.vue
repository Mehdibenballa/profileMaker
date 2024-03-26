<script setup>
import axios from "axios";

import { reactive } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useTodoStore } from "../store";

import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

import logo from "../components/icons/logo.vue";
import password from "../components/icons/password.vue";
import message from "../components/icons/message.vue";

const store = useTodoStore();
const router = useRouter();

const user = reactive({
  email: "",
  password: "",
});
const rules = {
  email: {
    required: helpers.withMessage("Can't be empty", required),
    email: helpers.withMessage("Please enter a valid email address", email),
  },
  password: {
    required: helpers.withMessage("Can't be empty", required),
  },
};

const v$ = useVuelidate(rules, user);

const validate = async () => {
  const result = await v$.value.$validate();
  if (result) {
    const login = await axios.post("http://localhost:3333/api/login", user);
    store.loginUser(login.data);
    router.push("/links");
  }
};
</script>

<template>
  <section
    class="container flex flex-col items-center justify-center min-h-screen"
  >
    <div class="mb-16">
      <logo />
    </div>
    <div class="bg-white p-6 rounded-lg lg:w-1/3">
      <h1 class="font-bold text-black text-2xl mb-4">Login</h1>
      <p class="text-normal-gray mb-8">
        Add your details below to get back into the app
      </p>
      <label
        :class="v$.email.$error ? 'text-red' : ''"
        class="block text-xs text-dark-gray"
        for="email"
      >
        <span>Email address</span>
      </label>
      <div class="relative mt-2 flex items-center border-0 p-0 mb-4">
        <div
          class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
        >
          <message />
        </div>
        <input
          :class="v$.email.$error ? 'border-red' : ''"
          v-model="user.email"
          type="email"
          class="h-12 w-full rounded-lg border border-borders placeholder:text-dark-gray/50 focus:outline-button pl-11 pr-4"
          placeholder="e.g. alex@email.com"
          autocomplete="username"
          id="email"
        />
        <h2
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-red text-sm"
        >
          {{ error.$message }}
        </h2>
      </div>

      <label
        :class="v$.password.$error ? 'text-red' : ''"
        class="block text-xs text-dark-gray"
        for="password"
      >
        <span>Password</span>
      </label>
      <div class="relative mt-2 flex items-center border-0 p-0 mb-4">
        <div
          class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
        >
          <password />
        </div>
        <input
          :class="v$.password.$error ? 'border-red' : ''"
          v-model="user.password"
          type="password"
          class="h-12 w-full rounded-lg border placeholder:text-dark-gray/50 pl-11 pr-4"
          placeholder="Enter your password"
          autocomplete="username"
          id="password"
        />
        <h2
          v-for="error in v$.password.$errors"
          :key="error.$uid"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-red text-sm"
        >
          {{ error.$message }}
        </h2>
      </div>
      <button
        @click="validate"
        class="p-2 w-full bg-button rounded-lg mt-2 text-white fobt-bold mb-4"
      >
        Login
      </button>
      <div class="flex gap-2 justify-center">
        <h2 class="text-normal-gray text-center">Don't have an account?</h2>
        <router-link to="/register" class="text-button"
          >Create account</router-link
        >
      </div>
    </div>
  </section>
</template>
<style></style>
