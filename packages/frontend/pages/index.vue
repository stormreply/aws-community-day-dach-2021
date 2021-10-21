<template>
  <Tutorial />
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'

const FizzBuzzModule = namespace('fizzbuzz')

@Component
export default class MyComponent extends Vue {
  @FizzBuzzModule.Action('check') check!: (value: number) => Promise<any>

  async mounted() {
    console.log('mounted')
    await this.check(23)
  }
}
</script>
