<!-- Please remove this file from your project -->
<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-500 sm:items-center sm:pt-0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet" />
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <a class="flex justify-center pt-8 sm:pt-0" href="https://nuxtjs.org" target="_blank">
        <img class="h-12 w-auto" src="https://www.aws-community-day.de/assets/img/logo.png" alt="Nuxt.js" />
      </a>
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <h2 class="text-2xl leading-7 font-semibold">Welcome to the FizzBuzz Demo Project</h2>
        <p class="mt-3 text-gray-600">
          We recommend you take a look at the
          <a
            href="https://github.com/stormreply/aws-community-day-dach-2021"
            target="_blank"
            class="text-green-500 hover:underline"
            >GitHub Repository</a
          >
          for the full project source code.<br />
        </p>
        <p class="mt-4 pt-4 text-gray-800 border-t border-dashed">
          For the randomly generated number
          <code class="bg-gray-100 text-sm p-1 rounded border">{{ value }}</code>
          the api returned
          <code class="bg-gray-100 text-sm p-1 rounded border">{{ result }}</code>
          as result.<br />Click <a class="underline" href="#" @click="refresh">here</a> to try again!
        </p>
      </div>
      <div class="flex justify-center pt-4 space-x-2">
        <a href="https://github.com/stormreply/aws-community-day-dach-2021" target="_blank"
          ><svg
            class="w-6 h-6 text-gray-600 hover:text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="32"
            height="32"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 0 1 1.025-2.688a3.594 3.594 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 0 1 .1 2.65a3.869 3.869 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 0 1 .675 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247z"
              fill="currentColor"
            /></svg
        ></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator';

const FizzBuzzModule = namespace('fizzbuzz');

@Component
export default class TutorialComponent extends Vue {
  @FizzBuzzModule.Action('check') check!: (value: number) => Promise<any>;

  getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  private value = 0;
  private resultValue = '';

  async mounted() {
    await this.refresh();
  }

  async refresh() {
    this.value = this.getRandomInt(100);
    this.resultValue = await this.check(this.value);
  }

  get result() {
    return this.resultValue;
  }
}
</script>
