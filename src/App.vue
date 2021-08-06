<template>
  <v-app id="inspire">
    <!-- hamburger bar -->
    <v-app-bar prominent flat dense app v-if="$vuetify.breakpoint.mdAndDown">
      <v-app-bar-nav-icon
        v-model="drawer"
        v-click-outside="() => (drawer = false)"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>{{ this.$route.name }}</v-toolbar-title>
    </v-app-bar>
    <!-- <v-app-bar-nav-icon
      app
      v-if="$vuetify.breakpoint.mdAndDown"
      v-model="drawer"
      @click="drawer = true"
      v-click-outside="() => (drawer = !drawer)"
    ></v-app-bar-nav-icon> -->
    <v-navigation-drawer
      app
      :value="toggleValue($vuetify.breakpoint.mdAndDown)"
      dark
      :expand-on-hover="!$vuetify.breakpoint.mdAndDown"
      style="background-color: #374A67"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Jun Wen Tsang
            </v-list-item-title>
            <v-list-item-subtitle>Jun_Wen@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ item.title }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Search", icon: "mdi-magnify", to: "/search" },
      { title: "All Books", icon: "mdi-book-open-variant", to: "/allBooks" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
      { title: "Create Book", icon: "mdi-plus-thick", to: "/createBooks" },
    ],
    right: null,
  }),
  methods: {
    toggleValue(ismdAndDown) {
      console.log(`ismdAndDown:`);
      console.log(ismdAndDown);
      // Handle scenario where screen is small and drawer is closed
      if (ismdAndDown && this.drawer === false) {
        this.drawer = null;
      }
      // if screen is small and drawer is neither true nor null
      if (ismdAndDown && this.drawer !== false) {
        return this.drawer;
        // return true;
      }
      // if screen is large, or is small but true, or is small
      return true;
    },
  },
};
</script>
<style>
.v-navigation-drawer {
  height: 100% !important;
}
</style>
