import { of, Observable } from "rxjs";
import { DictMockData } from "../mocks/dict-mock-data";
export interface DictData {
  id: string;
  code: string;
  name: string;
}
export class ResponseInfo {
  code: string;
  message: string;
  returnValue: DictData[];
  constructor() {}
}
export class DictMockDataService {
  /**
   * 获得全部数据
   */
  getAll(): Observable<ResponseInfo> {
    var data: DictData[] = [];
    DictMockData.forEach((element) => {
      data.push(this.fromRawData(element));
    });
    const result = new ResponseInfo();
    result.code = "0";
    result.returnValue = data;
    return of(result);
  }
  private fromRawData(data: any): DictData {
    return JSON.parse(JSON.stringify(data)) as DictData;
  }
}
