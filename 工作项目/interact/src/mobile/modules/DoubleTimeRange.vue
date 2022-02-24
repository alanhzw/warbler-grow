<template>
  <div class="double-time-range">
    <div class="first">{{ options.label1 }}{{Moment(activityInfo[this.options.startKey1]).format('YYYY-MM-DD HH:mm')}} 至 {{Moment(activityInfo[this.options.endKey1]).format('YYYY-MM-DD HH:mm')}}</div>
    <div>{{ options.label2 }}{{Moment(activityInfo[this.options.startKey2]).format('YYYY-MM-DD HH:mm')}} 至 {{Moment(activityInfo[this.options.endKey2]).format('YYYY-MM-DD HH:mm')}}</div>
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
.double-time-range {
  color: #ffc688;
  font-size: 0.24rem;
  background-image: url('../../assets/border-double-lines.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0.2rem;
  line-height: 0.5rem;
  padding: 0.2rem;
  .first {
    color: #ffffff;
  }

}
</style>
