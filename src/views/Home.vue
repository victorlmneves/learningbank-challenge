<template>
  <main class="home">
    <ManageRules v-if="rules.length > 0" />
    <NoRules v-else />
  </main>
</template>

<script>
import ManageRules from '@/views/ManageRules.vue'
import NoRules from '@/views/NoRules.vue'

export default {
  name: 'Home',

  data() {
    return {
      rules: []
    }
  },

  components: {
    ManageRules,
    NoRules
  }
}
</script>
