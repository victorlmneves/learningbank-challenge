<template>
  <div class="rules-list">
    <div class="rules-list__header">
      <div class="rules-list__options">
        <h2 class="rules-list__option is-active">
          <img src="img/rules-settings.svg" alt="settings" />
          Overview
        </h2>
        <h2 class="rules-list__option">
          <img src="img/details.svg" alt="logs" />
          Activity Log
        </h2>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr class="table__head-row">
          <th class="table__check">
            <input @click="checkAll()" v-model="isAllSelected" type="checkbox" />
          </th>
          <th colspan="4">
            <span class="table__sort" @click="sortRules()">
              <img src="img/sort.svg" alt="sort" />
              Rule name
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="table__body-row" v-for="(row, index) in rules" :key="index">
          <td class="table__check">
            <input ref="checkboxes" @click="updateChecks(index)" type="checkbox" />
          </td>
          <td>{{ row.name }}</td>
          <td class="table__actions">
            <img class="table__icons" src="img/details.svg" alt="details" />
          </td>
          <td class="table__actions">
            <AppSwitch
              :id="row.id"
              :checked="row.status"
              :value="row.status"
              @change-status="updateStatus"
            ></AppSwitch>
          </td>
          <td class="table__actions">
            <img class="table__icons" src="img/more.svg" alt="more" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AppSwitch from '@/components/forms/AppSwitch.vue'

export default {
  name: 'RulesList',

  props: {
    headers: {
      type: Array,
      default: () => []
    },

    rules: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      sort: {
        type: 'asc',
        field: 'name'
      },
      isAllSelected: false
    }
  },

  components: {
    AppSwitch
  },

  methods: {
    /**
     * @param {Object} rule
     */
    updateStatus (rule) {
      this.$store.dispatch('updateStatus', rule)
    },

    sortRules () {
      this.sort.type = this.sort.type === 'asc' ? 'desc' : 'asc'
      this.sort.field = 'name'
      this.$store.dispatch('sortRules', this.sort)
    },

    checkAll () {
      this.isAllSelected = !this.isAllSelected
      this.$refs.checkboxes.forEach(checkbox => {
        checkbox.checked = this.isAllSelected
      })
    },

    updateChecks () {
      this.isAllSelected = false
      this.$refs.checkboxes.checked = false
    }
  }
}
</script>

<style lang="scss" scoped>
.rules-list {
  display: flex;
  flex-direction: column;
  margin: 40px auto 0;
  width: 90%;
}

.rules-list__options {
  align-items: center;
  display: flex;
  gap: 30px;

  img {
    height: auto;
    width: 16px;
  }
}

.rules-list__option {
  font-size: 16px;

  &.is-active {
    color: $blue;
  }
}

.table {
  background: $white;
  border-radius: 3px;
  border-collapse: collapse;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  width: 100%;

  th,
  td {
    padding: 10px;
  }
}

.table__head-row {
  border-bottom: 1px solid $silver;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
}

.table__body-row {
  border-bottom: 1px solid $silver;
  font-size: 14px;
  text-align: left;
}

.table__check,
.table__actions {
  width: 30px;
}

.table__icons {
  height: auto;
  width: 20px;
}

.table__sort {
  align-items: center;
  display: inline-flex;

  img {
    height: auto;
    margin-right: 5px;
    width: 12px
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
