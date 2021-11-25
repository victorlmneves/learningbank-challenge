<template>
  <section class="user-managment">
    <div v-if="rules" class="user-managment__content"></div>
    <div v-else class="user-managment__content">
      <h1 class="user-managment__title">User<br />automation</h1>
      <p class="user-managment__text">
        Now you can create automations and automatically perform actions is
        regards to your users.
      </p>
      <p class="user-managment__text">
        You can decide when users should be
        <span>activated, deactivated, anonymized</span> and
        <span>deleted.</span>
      </p>
      <div class="user-managment__btn-wrapper">
        <AppButton :disabled="false" @click="addRule">
          <span>+</span> Create Rule
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from '@/components/forms/AppButton.vue'

export default {
  name: 'UserManagment',

  components: {
    AppButton
  },

  props: {
    rules: Array
  },

  methods: {
    addRule() {
      this.$router.push({ path: 'manage-rules' })
    }
  }
}
</script>

<style scoped lang="scss">
.user-managment {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.user-managment__title,
.user-managment__text {
  text-align: center;

  span {
    font-weight: 700;
  }
}

.user-managment__btn-wrapper {
  display: flex;
  justify-content: center;

  ::v-deep .button {
    background: $aqua-green;
    margin-top: 40px;
  }
}
</style>
