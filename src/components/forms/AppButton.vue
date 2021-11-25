<template>
  <button class="button" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',

  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleClick(event) {
      /**
       * @event click
       * @type {Event}
       */
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  align-items: center;
  background: $blue;
  border: none;
  border-radius: 3px;
  color: $white;
  display: inline-flex;
  font-size: 14px;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 0;
  padding: 8px 12px;

  &:disabled {
    background: $silver;
    color: $default-color;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
