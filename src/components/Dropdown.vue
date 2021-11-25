<template>
  <div class="dropdown">
    <button class="dropdown__btn" :disabled="btnStatus" @click.prevent="showMenu">
      <slot></slot>
    </button>

    <ul ref="dropdownList" class="dropdown__list">
      <li class="dropdown__item" v-for="(item, index) in options" :key="index">
        <p v-if="!item.options" @click.prevent="changeOption">{{ item.label }}</p>
        <p class="dropdown__next" v-else @click.prevent="showSubmenu">
          {{ item.label }}
          <i class="icon icon--arrow-right"></i>
        </p>
        <ul v-if="item.options" class="dropdown__sublist">
          <li class="dropdown__item">
            <p class="dropdown__back" @click="showSubmenu">Back</p>
          </li>
          <li class="dropdown__item" v-for="(option, index) in item.options" :key="index">
            <p @click="changeOption">{{ option.label }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',

  props: {
    defaultText: {
      type: String,
      default: null,
    },
    btnStatus: {
      type: Boolean,
      default: false,
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
    /**
     * @param {Object} event
     */
    showMenu(event) {
      event.target.classList.toggle('is-open')
      this.$refs.dropdownList.classList.toggle('is-active')
    },
    /**
     * @param {Object} event
     */
    closeMenu(event) {
      event.target.closest('.dropdown').children[0].classList.toggle('is-open')
      this.$refs.dropdownList.classList.toggle('is-active')
    },

    showSubmenu(event) {
      event.target.nextElementSibling.classList.toggle('is-active')
      this.$refs.dropdownList.classList.toggle('is-behind')
    },

    /**
     * @param {Object} event
     */
    changeOption(event) {
      this.$emit('change-option', event)
      this.closeMenu(event)
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  align-items: center;
  display: flex;
  position: relative;
}

.dropdown__list,
.dropdown__sublist {
  @include unordered-list();

  background: $white;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  display: none;
  position: absolute;
  top: 30px;
  width: 100%;

  &.is-active {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    display: table;
  }

  &.is-behind {
    box-shadow: unset;
  }
}

.dropdown__sublist {
  left: 0;
  height: 100%;
  top: 0;

  &.is-active {
    background: $white;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  }
}

.dropdown__item,
.dropdown__item ul {
  @include unordered-list();
}

.dropdown__item {
  font-size: 14px;

  p {
    margin: 0;
    padding: 10px;
  }

  &:hover {
    background: $silver;
    cursor: pointer;
  }
}

.dropdown__next {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &::after {
    background: url(/img/right.png) no-repeat;
    background-size: contain;
    content: '';
    display: inline-flex;
    height: 16px;
    width: 20px;
  }
}

.dropdown__back {
  align-items: center;
  display: inline-flex;

  &::before {
    background: url(/img/left-arrow.png) no-repeat;
    background-size: contain;
    content: '';
    display: inline-flex;
    height: 16px;
    margin-right: 5px;
    width: 20px;
  }
}

.dropdown__btn {
  align-items: center;
  background: $white;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  color: $default-color;
  display: inline-flex;
  font-size: 15px;
  height: 30px;
  justify-content: space-between;
  padding: 0 10px;
  min-width: 220px;
  width: auto;

  span {
    text-align: left;
    width: 100%;
  }

  // &::after {
  //   background: url('/img/down.png') no-repeat center center;
  //   margin-left: 10px;
  // }

  // &::before {
  //   background: url('/img/group.png') no-repeat center center;
  //   margin-right: 10px;
  // }

  // &::after,
  // &::before {
  //   background-size: contain;
  //   content: '';
  //   display: inline-flex;
  //   height: 15px;
  //   width: 15px;
  // }

  &.is-open {
    &::after {
      transform: rotate(180deg);
    }
  }

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    background: $bg-color;
    color: $bg-color;

    &::after,
    &::before,
    i {
      background: $bg-color;
    }
  }
}

// select {
//   border-radius: 3px;
//   font-size: 14px;
//   padding: 4px;

//   &::before {
//     background: $blue;
//     border-radius: 3px;
//     content: 'dd';
//     display: flex;
//     height: 6px;
//     margin-right: 10px;
//     width: 6px;
//   }
// }
</style>
