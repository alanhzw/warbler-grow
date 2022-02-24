import { BaseInfo } from '@/types/BaseInfo';

interface PathParams {
  [propName: string]: string;
}

export interface InitResponse {
  baseInfo: BaseInfo | null;
  isOpenCard: boolean | null;
  pathParams: PathParams;
}
