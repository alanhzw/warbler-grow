const isJDLink = (link) => {
  return /^((https|http):\/\/)[a-zA-Z0-9-.]+(.isvjcloud.com|.isvjd.com|.jd.com)/g.test(link);
}
const isSuningLink = (link) => {
  return /^((https|http):\/\/)[a-zA-Z0-9-.]+(.suning.com)/g.test(link);
}
export default {
  getValidDomains () {
    switch (sessionStorage.getItem('LZ_CRM_PLATFORM')) {
      case 'suning' :
        return ['suning.com'];
      case 'jd':
        return ['isvjcloud.com','isvjd.com','jd.com'];
      default:
        return ['isvjcloud.com','isvjd.com','jd.com'];
    }
  },
  isValidLink (link) {
    return sessionStorage.getItem('LZ_CRM_PLATFORM') === 'suning' ? isSuningLink(link) : isJDLink(link);
  }
}