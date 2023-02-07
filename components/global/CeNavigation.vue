<template>
  <div
    :class="{
      'sidebar-open': !isCollapse,
      'sidebar-collapse': isCollapse
    }"
  >
    <div class="logo" @click="handleNavigateHome">
      <span slot="title" style="position: relative">
        <img
          class="logo_img small"
          :class="isCollapse ? 'index' : '--index'"
          :src="require(`../../assets/images/logo-small.svg`)"
        />
        <img
          class="logo_img"
          :class="!isCollapse ? 'index' : '--index'"
          :src="dynamicLogo"
        />
      </span>
    </div>
    <el-menu
      :default-active="activeItem"
      class="el-menu-vertical-demo el-menu"
      @open="handleOpen"
      @close="handleClose"
      :collapse-transition="true"
      @mouseenter.native="handleOpen"
      @mouseleave.native="handleClose"
      :router="true"
    >
      <el-menu-item
        v-for="(item, index) in menuItems"
        :key="index"
        class="menu-item"
        :index="item.id.toString()"
        :route="item.route"
      >
        <i :class="item.icon"></i>
        <span
          class="menu-item--text"
          :class="{ 'menu-item--text__collapsed': isCollapse }"
          >{{ item.name }}</span
        >
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: 'logo_full.svg',
      isCollapse: true,
      activeItem: '2',
      menuItems: []
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      this.changeCollapse(false)
    },
    handleNavigateHome() {
      this.$router.push('/')
    },
    handleClose(key, keyPath) {
      this.changeCollapse(true)
    },
    changeCollapse(model) {
      this.isCollapse = model

      this.$emit('change-collapse', this.isCollapse)
    },
    getMenu() {
      const menuItems = localStorage.getItem('nav-menu')
      if (!this.lodash.isNil(menuItems)) {
        this.menuItems = JSON.parse(menuItems)
      }
    }
  },
  computed: {
    logoCollapse() {
      return (this.logo = this.isCollapse ? 'logo-small.svg' : 'logo_full.svg')
    },
    dynamicLogo() {
      if (localStorage.getItem('logo')) {
        return localStorage.getItem('logo')
      } else {
        return require(`../../assets/images/logo_full.svg`)
      }
    }
  },
  created() {
    this.getMenu()
    if (
      this.menuItems &&
      this.menuItems.find(
        (elem) =>
          elem.name ===
          this.$route.path.split('/')[1].charAt(0).toUpperCase() +
            this.$route.path.split('/')[1].slice(1)
      )
    ) {
      this.activeItem = this.menuItems
        .find(
          (elem) =>
            elem.name ===
            this.$route.path.split('/')[1].charAt(0).toUpperCase() +
              this.$route.path.split('/')[1].slice(1)
        )
        .id.toString()
    } else {
      this.activeItem = ''
    }
    this.$emit('change-collapse', this.isCollapse)
  }
}
</script>
<style lang="scss" scoped>
.menu-item {
  height: 46px;
  line-height: 46px;
}
.el-menu {
  /deep/ & .el-menu-item.is-active {
    background-color: #eaf1fb !important;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
}
.menu-item {
  overflow: hidden;

  &--text {
    transition: 0.1s;
    &__collapsed {
      visibility: hidden;
    }
  }
}
.logo_img {
  position: absolute;
  max-height: 45px;
}

.index {
  z-index: 100;
}

.--index {
  z-index: -100;
}
</style>
