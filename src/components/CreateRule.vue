<template>
  <div class="user-management">
    <form class="user-management__form">
      <div class="user-management__header">
        <h1 @keydown.enter.prevent="handleRuleName" ref="roleTitle" class="user-management__title">Untitled Rule</h1>
        <img @click="editRuleName" class="icon icon--edit" alt="Edit" src="/img/edit.svg">
      </div>
      <div class="user-management__container">
        <p class="user-management__label">If user is</p>
        <Dropdown
          name="'status'"
          :defaultText="statusText"
          :options="statusOptions"
          @change-option="onStatusChange"
        >
          <i class="icon icon--users"></i>
          <span>{{ statusText }}</span>
          <i class="icon icon--arrow-down"></i>
        </Dropdown>

        <p class="user-management__label">.then</p>
        <Dropdown
          ref="actions"
          name="'status'"
          :defaultText="actionsText"
          :options="actionsOptions"
          :btnStatus="true"
          @change-option="onActionChange"
        >
          <i ref="settings" class="icon icon--settings"></i>
          <span>{{ actionsText }}</span>
          <i class="icon icon--arrow-down"></i>
        </Dropdown>

        <Dropdown
          ref="when"
          name="'status'"
          :defaultText="whenText"
          :options="whenOptions"
          :btnStatus="true"
          @change-option="onWhenChange"
        >
          <i ref="clock" class="icon icon--clock"></i>
          <p class="user-management__days" ref="nrOfDays"></p>
          <span>{{ whenText }}</span>
          <i class="icon icon--arrow-down"></i>
        </Dropdown>
      </div>
      <div class="user-management__container user-management__container--button">
        <AppButton :disabled="isButtonDisabled" @click.prevent="addRule">
          <span>+</span> Create Rule
        </AppButton>
      </div>
    </form>
  </div>
</template>

<script>
import AppButton from '@/components/forms/AppButton.vue'
import Dropdown from '@/components/Dropdown.vue'

export default {
  name: 'CreateRule',

  components: {
    AppButton,
    Dropdown
  },

  data() {
    return {
      statusText: "Choose status",
      statusOptions: [
        {
          value: "active",
          label: "Active"
        },
        {
          value: "anonymous",
          label: "Anonymous"
        },
        {
          value: "created",
          label: "Created"
        },
        {
          value: "deactivated",
          label: "Deactivated"
        }
      ],

      actionsText: "Choose action",
      actionsOptions: [
        {
          value: "anonymize",
          label: "Anonymize"
        },
        {
          value: "deactivate",
          label: "Deactivate"
        },
        {
          value: "delete",
          label: "Delete"
        }
      ],

      whenText: "Choose when",
      whenOptions: [
        {
          value: "afterXdays",
          label: "After X days"
        },
        {
          value: "",
          label: "User's first day",
          "options": [
            {
              value: "usersFirstDay",
              label: "On user's last day"
            },
            {
              value: "xDaysBeforeUsersFirstDay",
              label: "X days before user's last day"
            },
            {
              value: "xDaysAfterUsersFirstDay",
              label: "X days after user's last day"
            }
          ]
        },
        {
          value: "",
          label: "User's last day",
          "options": [
            {
              value: "usersLastDay",
              label: "On user's last day"
            },
            {
              value: "xDaysBeforeUsersLastDay",
              label: "X days before user's last day"
            },
            {
              value: "xDaysAfterUsersLastDay",
              label: "X days after user's last day"
            }
          ]
        }
      ],
      isButtonDisabled: true,
    }
  },

  methods: {
    handleRuleName () {
      this.$refs.roleTitle.contentEditable = false
    },

    editRuleName () {
      const roleName = this.$refs.roleTitle
      roleName.contentEditable = true
      roleName.focus()
    },

    /**
     * @param {Object} event
     */
    onStatusChange (event) {
      const actionsSelect = this.$refs.actions.$el.firstElementChild
      this.statusText = event.target.innerText
      actionsSelect.disabled = false
    },

    /**
     * @param {Object} event
     */
    onActionChange (event) {
      const whenSelect = this.$refs.when.$el.firstElementChild
      this.$refs.actions.$el.childNodes[0].childNodes[0].className = 'icon icon--users'
      this.actionsText = event.target.innerText
      whenSelect.disabled = false
    },

    /**
     * @param {Object} event
     */
    onWhenChange (event) {
      this.whenText = event.target.innerText.slice(2)
      this.$refs.nrOfDays.classList.add('is-filled')
      this.$refs.nrOfDays.innerText = '365'
      this.isButtonDisabled = false
    },

    addRule () {
      const rule = {
        "name": this.$refs.roleTitle.innerText,
        "status": this.statusText,
        "action": this.actionsText,
        "when": this.whenText,
        "nrOfDays": this.$refs.nrOfDays.innerText
      }

      this.$store.dispatch('createRule', rule)
      this.resetForm()
    },

    resetForm () {
      this.$refs.roleTitle.innerText = 'Untitled Rule'

      this.statusText = 'Choose status'

      this.$refs.actions.$el.firstElementChild.disabled = true
      this.actionsText = 'Choose action'

      this.$refs.when.$el.firstElementChild.disabled = true
      this.$refs.nrOfDays.innerText = ''
      this.whenText = 'Choose when'
      this.$refs.nrOfDays.classList.remove('is-filled')
    }
  }
}
</script>

<style lang="scss" scoped>
.user-management {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.user-management__form {
  background: $white;
  border-radius: 3px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 0 30px 30px;
  width: 90%;
}

.user-management__header {
  align-items: center;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.user-management__title {
  font-size: 24px;
  margin-right: 10px;
}

.user-management__container {
  align-items: center;
  display: flex;
  gap: 15px;
  height: 100%;
  justify-content: flex-start;
  width: 100%;
}

.user-management__container--button {
  justify-content: flex-end;

  ::v-deep .button {
    background: $blue;
    margin-top: 40px;

    &:disabled {
      background: $silver;

      &:hover {
        cursor: default;
      }
    }
  }
}

.user-management__days {
  font-size: 14px;
  margin: 0 10px 0 0;
  padding-right: 5px;

  &.is-filled {
    align-items: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    display: inline-flex;
    height: 100%;
    min-width: 30px;
    width: auto;
  }
}

.icon {
  height: 20px;
  min-width: 15px;
}

.icon--users {
  background: url(/img/users.svg) no-repeat center center;
  background-size: contain;
  margin-right: 10px;
}

.icon--arrow-down {
  background: url(/img/down.svg) no-repeat center center;
  background-size: contain;
  margin-left: 10px;
}

.icon--settings {
  background: url(/img/settings.svg) no-repeat center center;
  background-size: contain;
  margin-right: 10px;
}

.icon--clock {
  background: url(/img/clock.svg) no-repeat center center;
  background-size: contain;
  margin-right: 10px;
}
</style>
