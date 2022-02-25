<template>
  <div v-cloak>
    <Header />
    <Nuxt class="page" />
    <sidebar />
    <Footer />
  </div>
</template>
<style lang="scss" scoped>
.page {
  min-height: 60vh;
}
</style>
<script>
import Sidebar from '@/components/Sidebar'

export default {
  components: { Sidebar }
}
</script>
