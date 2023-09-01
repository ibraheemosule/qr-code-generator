<script setup lang="ts">
import TitleText from "../reusables/title-text/TitleText.vue";
import ActionBtn from "../reusables/action-btn/ActionBtn.vue";
</script>

<template>
  <v-container class="fill-height">
    <v-row class="justify-space-around">
      <v-col cols="12" md="6" lg="5" class="d-flex justify-center flex-column">
        <TitleText value="Generate a custom qr code for your website" />

        <div class="d-md-none w-100 px-sm-16 py-8">
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

<!-- <template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1 text-warning">
        Welcome to
      </div>

      <h1 class="text-h2 font-weight-bold">Vuetify</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="https://vuetifyjs.com/components/all/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-view-dashboard" size="large" start />

            Components
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://vuetifyjs.com/introduction/why-vuetify/#feature-guides"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon icon="mdi-speedometer" size="large" start />

            Get Started
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="https://community.vuetifyjs.com/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-account-group" size="large" start />

            Community
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
//
</script> -->
