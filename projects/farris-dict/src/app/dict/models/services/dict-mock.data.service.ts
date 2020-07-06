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
  pagination?: Pagination;
  constructor() {}
}
export class Pagination {
  pageIndex: number;
  pageSize: number;
  total: number;
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

  /**
   * 查询数据
   */
  query(filter: any[], sorts: any[], pageSize: number, pageIndex: number) {
    const result = new ResponseInfo();
    const start = pageSize * (pageIndex - 1);
    let data = [];
    if (start + pageSize < DictMockData.length) {
      const end = start + pageSize;
      data = DictMockData.slice(start, end);
    } else {
      data = DictMockData.slice(start, DictMockData.length);
    }
    let returnData = [];
    data.forEach((element) => {
      returnData.push(this.fromRawData(element));
    });
    result.code = "0";
    result.returnValue = returnData;
    result.pagination = {
      pageIndex,
      pageSize,
      total: DictMockData.length,
    };
    return of(result);
  }
}
