/*
 * @Description:
 * @Date: 2021-03-15 11:31:57
 * @LastEditTime: 2021-08-16 16:19:33
 * @FilePath: \decoration\src\utils\valid.js
 */
const isJDLink = link => {
  return /^((https|http):\/\/)[a-zA-Z0-9-.]+(.isvjcloud.com|.isvjd.com|.jd.com)/g.test(link);
};
const isSuningLink = link => {
  return /^((https|http):\/\/)[a-zA-Z0-9-.]+(.suning.com)/g.test(link);
};
const platform = process.env.VUE_APP_PLATEFORM === "tmall";

const isTmallLink = link => {
  const testBegin = new RegExp(
    "^(((https|http)://m.duanqu.com)|((https|http)://market.m.taobao.com)|((https|http)://www.taobao.com))"
  );
  const testEnd = new RegExp("(.m.tmall.com|.m.taobao.com|.tmall.com)$");
  return testEnd.test(link) || testBegin.test(link);
};
export default {
  getValidDomains() {
    if (platform) {
      return ["m.duanqu.com", "www.taobao.com", ".m.tmall.com", ".m.taobao.com", ".tmall.com", "market.m.taobao.com"];
    } else {
      switch (sessionStorage.getItem("LZ_CRM_PLATFORM")) {
        case "suning":
          return ["suning.com"];
        case "jd":
          return ["isvjcloud.com", "isvjd.com", "jd.com"];
        default:
          return ["isvjcloud.com", "isvjd.com", "jd.com"];
      }
    }
  },
  isValidLink(link) {
    if (platform) {
      return isTmallLink(link);
    } else {
      return sessionStorage.getItem("LZ_CRM_PLATFORM") === "suning" ? isSuningLink(link) : isJDLink(link);
    }
  }
};
