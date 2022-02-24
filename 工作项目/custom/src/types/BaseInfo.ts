import { ActivityBaseInfo } from './ActivityBaseInfo';
import { ActivityStatus } from './ActivityStatus';

export interface BaseInfo extends ActivityBaseInfo {
  pin: string,
  nickname: string,
  status: ActivityStatus,
  shareType: string
}
