<template>
  <main class="home">
    <CreateRule />
    <RulesList :rules="rulesListAux"></RulesList>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CreateRule from '@/components/CreateRule.vue'
import RulesList from '@/components/RulesList.vue'

export default {
  name: 'ManageRules',

  components: {
    CreateRule,
    RulesList
  },

  computed: {
    ...mapGetters(['rulesListAux'])
  },

  created () {
    this.getAll()
  },

  methods: {
    ...mapActions(['getAll'])
  }
}
</script>
