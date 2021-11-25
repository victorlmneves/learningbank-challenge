<template>
  <label class="switch">
    <input
      type="checkbox"
      :data-rule-id="id"
      :name="name"
      :value="value"
      :checked="checked"
      @click="onChange"
    />
    <span class="switch__toggle"></span>
  </label>
</template>

<script>
export default {
  name: 'AppSwitch',

  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: 'active',
    },
    value: [String, Number, Boolean],
    checked: [String, Number, Boolean]
  },

  methods: {
    onChange(event) {
      const id = event.target.dataset.ruleId
      const active = event.target.checked
      const rule = {
        id,
        active
      }

      this.$emit('change-status', rule)
    }
  }
}
</script>

<style lang="scss" scoped>
.switch {
  bottom: 2px;
  display: inline-block;
  height: 18px;
  position: relative;
  width: 36px;
}

.switch input {
  height: 0;
  opacity: 0;
  width: 0;
}

.switch__toggle {
  background: $silver;
  border-radius: 30px;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
}

.switch__toggle:before {
  background: $white;
  border-radius: 50%;
  bottom: 2px;
  content: "";
  height: 14px;
  left: 4px;
  position: absolute;
  transition: .4s;
  width: 14px;
}

input:focus + .switch__toggle {
    box-shadow: 0 0 1px $blue;
  }

  input:checked + .switch__toggle:before {
    transform: translateX(14px);
  }

input:checked + .switch__toggle {
  background: $blue;
}
</style>
