<template>
  <div class="index-partner-section">
    <div class="partner-title">
      陆泽科技与20万+品牌携手共进
    </div>
    <partner-section />
  </div>
</template>

<script>

import PartnerSection from '@/components/PartnerSection'

export default {
  name: 'IndexPartnerSection',
  components: { PartnerSection }
}
</script>

<style lang="scss" scoped>
.index-partner-section {
  .partner-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .6rem;
    height: 2.53rem;
    margin: auto;
    color: $--color-white;
  }
}
</style>
