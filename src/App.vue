<template>

  <div>
    <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
    <router-view />

  </div>


</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
<style>

.bg-negative-light{
  background: var(--negative-light);
}

.bg-positive-light{
  background: var(--positive-light);
}

body{
  color: white;
  background: #212431;
  --bg-plot: rgb(21 25 38);
  --scroll-margin: 1rem;
  --footer-height: 1rem;
  --background-main: #151825;
  --text-secondary-color: #339f31;
  scrollbar-width: thin!important;
  scrollbar-color: #2c3449 transparent!important;
  scrollbar-gutter: both-edges!important;
  scrollbar-arrow-color: transparent!important;
  --positive-light: #50e350;
  --negative-light: #da4141
}

.align-center{
  align-items: center!important;
}

html{

}

.q-layout, .q-page, div, html{
  scrollbar-width: thin;
  scrollbar-color: #2c3449 transparent;
  scrollbar-gutter: both-edges;
  scrollbar-arrow-color: transparent;
}

.w-fit{
  width: fit-content;
}

.pa-lg{
  padding: 4rem!important;
}
</style>
