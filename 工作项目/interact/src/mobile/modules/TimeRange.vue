<template>
  <div class="time-range">
    {{ options.label }}{{Moment(activityInfo[this.options.startKey]).format('YYYY-MM-DD HH:mm')}} 至 {{Moment(activityInfo[this.options.endKey]).format('YYYY-MM-DD HH:mm')}}
  </div>
</template>
<script>

import Moment from 'moment';

export default {
  name: 'TimeRange',
  components: {
  },
  props: {
    options: {
      default: () => ({}),
    },
    userInfo: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    settings: {
      default: () => ({}),
    },
  },
  data() {
    return {
      Moment,
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>
<style lang="scss">
.time-range {
  color: #ffc688;
  font-size: 0.24rem;
  background-image: url('../../assets/border-single-line.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0.2rem;
  line-height: 0.8rem;;

}
</style>
