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

  /*
   * 获取新建数据默认值
   */
  getDefaultValue() {
    const result = new ResponseInfo();
    result.code = "0";
    const item = {
      id: "ID_" + new Date().valueOf().toString(),
      name: "",
      code: "",
    };
    result.returnValue = [item];
    return of(result);
  }
  /**
   * 保存数据
   * @param data 所要保存的数据
   */
  save(data: DictData): Observable<ResponseInfo> {
    const result = new ResponseInfo();
    const index = DictMockData.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      // 修改
      DictMockData[index] = data;
      result.code = "0";
    } else {
      // 新增
      DictMockData.push(data);
      result.code = "0";
    }
    result.returnValue = [data];
    return of(result);
  }
  /**
   * 删除数据
   * @param id 所要删除数据的标识
   */
  remove(id: string): Observable<ResponseInfo> {
    const index = DictMockData.findIndex((item) => item.id === id);
    const result = new ResponseInfo();
    if (index !== -1) {
      DictMockData.splice(index, 1);
      result.code = "0";
    } else {
      result.message = "无效的Id";
      result.code = "1";
    }
    return of(result);
  }

  private fromRawData(data: any): DictData {
    return JSON.parse(JSON.stringify(data)) as DictData;
  }
}
