<template>
<q-page>
  <div class="bg-faq align-center justify-center flex pa-lg" style="min-height: 60vh">
      <div>
      <p class="text-h3 margin-navbar">Как вам
        <span class="text-primary">помочь?</span>
      </p>
        <q-input input-class="text-white" style="margin-top: 1rem; color: var(--bg-plot)" aria-placeholder="Искать..." type="search" v-model="searchQuery" label="Поиск" outlined color="primary" label-color="grey-2" bg-color="transparent" >
          <template v-slot:prepend>
            <q-icon name="search" color="grey-2"/>
          </template>
        </q-input>
    </div>
  </div>
</q-page>
</template>

<script>
export default {
  name: "FAQ",
  data(){
    return {
      searchQuery: null
    }
  }
}
</script>

<style>
.bg-faq{
  background: url("../assets/test/faq-bg.png") no-repeat;
  object-fit: contain;
  background-size: contain;
}

.q-field--outlined .q-field__control:before{
  border: 2px solid #2c3449;
  border-radius: 1.5rem;
}

.q-field--outlined .q-field__control:after{
  border-radius: 1.5rem;
}

</style>

