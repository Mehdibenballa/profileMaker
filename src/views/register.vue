<script setup>
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import logo from "../components/icons/logo.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers, minLength } from "@vuelidate/validators";
import PasswordIcon from "../components/icons/password.vue";
import message from "../components/icons/message.vue";
import axios from "axios";
import { useTodoStore } from "../store";

const router = useRouter();
const store = useTodoStore();

const user = reactive({
  email: "",
  password: "",
  confirmPass: "",
});
const rules = {
  email: {
    required: helpers.withMessage("Can't be empty", required),
    email: helpers.withMessage("Please enter a valid email address", email),
  },
  password: {
    required: helpers.withMessage("Can't be empty", required),
    minLength: helpers.withMessage("Min is 8", minLength(8)),
  },
  confirmPass: {
    sameAsPassword: helpers.withMessage(
      "Not the same",
      () => user.password === user.confirmPass
    ),
  },
};

const v$ = useVuelidate(rules, user);

const validate = async () => {
  const result = await v$.value.$validate();
  if (result) {
    const register = await axios.post("http://localhost:3333/api/register", {
      email: user.email,
      password: user.password,
    });
    // if user save user in the store and localstorage
    store.loginUser(register.data);
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
      <h1 class="font-bold text-black text-2xl mb-4">Create account</h1>
      <p class="text-normal-gray mb-8">
        Let's get you started sharing your links!
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
          <PasswordIcon />
        </div>
        <input
          :class="v$.password.$error ? 'border-red' : ''"
          v-model="user.password"
          type="password"
          class="h-12 w-full rounded-lg border border-borders focus:outline-button placeholder:text-dark-gray/50 pl-11 pr-4"
          placeholder="At least 8 charachters"
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
      <label class="block text-xs text-dark-gray" for="password">
        <span>Confirme password</span>
      </label>
      <div class="relative mt-2 flex items-center border-0 p-0 mb-4">
        <div
          class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
        >
          <PasswordIcon />
        </div>
        <input
          v-model="user.confirmPass"
          type="password"
          class="h-12 w-full rounded-lg border border-borders focus:outline-button placeholder:text-dark-gray/50 pl-11 pr-4"
          placeholder="At least 8 charachters"
          autocomplete="username"
          id="confirmPass"
        />
        <h2
          v-for="error in v$.confirmPass.$errors"
          :key="error.$uid"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-red text-sm"
        >
          {{ error.$message }}
        </h2>
      </div>
      <p class="block text-xs text-dark-gray">
        <span>Password must contain at least 8 characters</span>
      </p>
      <button
        @click="validate"
        class="p-2 w-full bg-button rounded-lg mt-2 text-white fobt-bold mb-4"
      >
        Create new account
      </button>
      <div class="flex gap-2 justify-center">
        <h2 class="text-normal-gray text-center">Already have an account?</h2>
        <router-link to="/" class="text-button">Login</router-link>
      </div>
    </div>
  </section>
</template>

<style></style>
