<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-09-18 18:57:50
 * @LastEditTime: 2021-10-12 18:49:31
 * @FilePath: \decoration\src\ctrls\MemberCard\Preview.vue
-->
<template>
  <div class="ctrl-member-card-preview">
    <result :data="data"
            :user="user" />
  </div>
</template>
<script>
import Result from './Result';
import defaultAvatar from './assets/avatar.png';
import Service from '@/mobile/service';

export default {
  name: 'CtrlMemberCardPreview',
  components: {
    Result,
  },
  props: {
    data: {
      default: () => ({}),
    },
  },
  data() {
    return {
      user: {
        isDefault: true,
        imageUrl: defaultAvatar,
        nickname: '会员昵称',
        curPoint: 300,
        grade: 1,
        gradeName: '一星会员',
        openCardLink: '',
        autoGive: 0,
        openedCard: true,
      },
    };
  },
  created() {
    Service.getShopLevels().then(({
      data,
    }) => {
      const levels = data.levels.map((l) => {
        const levelData = Array.isArray(this.data.levels) ? (this.data.levels.filter(level => level.level === l.level)[0] || {}) : {};
        return ({
          level: l.level,
          levelName: l.levelName,
          pic: '',
          ...levelData,
        });
      });
      this.user.gradeName = levels[0].levelName;
    });
  },
};
</script>
<style lang="scss">
@import '../style/common_ctrl';

.ctrl-member-card-preview {}
</style>
