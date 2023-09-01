<script setup lang="ts">
import TitleText from "../reusables/title-text/TitleText.vue";
import ActionBtn from "../reusables/action-btn/ActionBtn.vue";
</script>

<template>
  <v-container class="fill-height py-16">
    <v-row class="justify-space-around">
      <v-col cols="12" md="6" lg="5" class="d-flex justify-center flex-column">
        <TitleText value="Generate a custom qr code for your website" />

        <div class="d-md-none w-100 px-sm-16">
          <v-img cover src="@/assets/hero-img.svg" />
        </div>
        <h4 class="mt-8 text-h6 font-weight-medium">
          Custom QR codes help users access your website by scanning the code
          with their device cameras (can be useful during campaigns)
        </h4>
        <router-link class="router-link my-6 d-block" to="/create-qr">
          <ActionBtn text="Get Started">
            <v-icon icon="mdi-arrow-right-thin" size="large" end />
          </ActionBtn>
        </router-link>
      </v-col>

      <v-col cols="12" md="6" lg="5" class="d-none d-md-block">
        <v-img src="@/assets/hero-img.svg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h4 {
  line-height: 1.5rem;
}

@media (min-width: 600px) {
  h4 {
    line-height: 2rem;
  }
}
.router-link {
  all: unset;
}
</style>
