import request from '../utils/axios';

class CtgyAPI {
  static api: CtgyAPI = new CtgyAPI();
  getFirstCtgyList() {
    return request.get('/findCtgys/:firstctgyId', false);
  }
  getSecThrdCtgyList(firstCtgyId: number) {
    return request.get(`/findCtgys/${firstCtgyId}`, false);
  }
}

export default CtgyAPI.api;
