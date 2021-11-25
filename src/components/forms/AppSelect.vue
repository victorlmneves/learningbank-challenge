<template>
  <div class="form-group">
    <label class="form-label" v-if="label" :for="name">{{ label }}</label>
    <select
      v-model="value"
      :class="className"
      :disabled="disabled"
      :name="name"
      :required="required"
      @change="onChange"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.value === value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',

  props: {
    label: {
      type: String,
      default: null,
    },
    className: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array
    }
  },

  data() {
    return {
      value: 'default'
    }
  },

  methods: {
    onChange(event) {
      /**
       * @event click
       * @type {Event}
       */
      this.$emit('onChange', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  align-items: center;
  display: flex;
}

select {
  border-radius: 3px;
  font-size: 14px;
  padding: 4px;

  &::before {
    background: $blue;
    border-radius: 3px;
    content: 'dd';
    display: flex;
    height: 6px;
    margin-right: 10px;
    width: 6px;
  }
}
</style>
