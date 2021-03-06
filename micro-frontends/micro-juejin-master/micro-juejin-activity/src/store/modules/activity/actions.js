import ActivityService from "@/services/ActivityService";
import {
  SET_BANNER_LIST,
  SET_ACTIVITY_LIST
} from "@/store/modules/activity/mutations-type";

const activityService = ActivityService.getInstance();

const actions = {
  getBannerList: async ({ commit }) => {
    const res = await activityService.getBannerList();
    commit(SET_BANNER_LIST, res);
  },
  getActivityList: async ({ commit }, city) => {
    if (city) {
      commit(SET_ACTIVITY_LIST, null);
    }
    const res = await activityService.getActivityList(city);
    if (res) {
      commit(SET_ACTIVITY_LIST, res);
    }
    return res;
  }
};

export default actions;
