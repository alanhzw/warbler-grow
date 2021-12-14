
<template>
  <div v-if="address"
       class="address-bar"
       @click="mapFold=!mapFold">
    <el-icon>
      <location-information class="icon-loc" />
    </el-icon>
    <span>{{address}}</span>
    <el-icon>
      <arrow-down v-if="mapFold" />
      <arrow-up v-else />
    </el-icon>
  </div>
  <div v-if="pos"
       v-show="!mapFold"
       ref="mapEl"
       class="container-amap"></div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from 'vue';
import { ArrowDown, ArrowUp, LocationInformation } from '@element-plus/icons';
import { getAmap } from '@/utils/map';

interface Pos {
  lng: number,
  lat: number,
}
const props = defineProps<{
  address: string,
  pos: Pos
}>()

const mapEl = ref();
const mapFold = ref(false);

watch(props,
  ({pos}) => {
    setMapCenter(pos)
  },
  {deep: true}
)

let AMap: any = null

onMounted(async () => {
  AMap = await getAmap();
  map = new AMap.Map(mapEl.value, {
    zoomEnable: false,
    scrollWheel: false,
    zoom: 11,
  });
  setMapCenter(props.pos)

})
let map: any = null;

const setMapCenter = (pos: Pos) => {
  if (pos) {
    const center = new AMap.LngLat(pos.lng, pos.lat)
    const marker = new AMap.Marker({
      position: center,
    });
    map?.setCenter(center);
    map?.add(marker)
  }
}


</script>

<style scoped lang="scss">
.address-bar {
  display: flex;
  align-items: center;
  line-height: 46px;
  background: #FFFFFF;
  padding: 0 20px;
  border: 1px solid #E8E8E8;
  .icon-loc {
    color: #ED263D;
  }
  span {
    margin: 0 6px;
    flex: 1;
  }

}
.container-amap {
  height: 120px;
}

</style>