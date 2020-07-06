import { DefaultRepository, NgRepository } from "@farris/devkit";
import { DictEntity } from "./entities/dict.entity";
import { Injectable, Injector } from "@angular/core";
import {
  DictMockDataService,
  ResponseInfo,
} from "./services/dict-mock.data.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable()
@NgRepository({
  apiUrl: "",
  entityType: DictEntity,
})
export class DictRepository extends DefaultRepository<DictEntity> {
  paginationInfo = {
    pageSize: 10,
  };

  constructor(injector: Injector, private dataService: DictMockDataService) {
    super(injector);
  }

  getList(): Observable<any> {
    return this.dataService.getAll().pipe(
      map((response: ResponseInfo) => {
        this.entityCollection.loadEntities(
          this.buildEntities(response.returnValue)
        );
        return true;
      })
    );
  }

  /**
   * 获取实体列表
   */
  getEntities(
    filter: any[],
    sorts: any[],
    pageSize: number,
    pageIndex: number
  ): Observable<DictEntity[]> {
    if (pageIndex == undefined) pageIndex = 1;
    if (pageSize == undefined) pageSize = this.paginationInfo.pageSize;
    return this.dataService.query(filter, sorts, pageSize, pageIndex).pipe(
      map((response: ResponseInfo) => {
        if (response.code == "0") {
          const returnData = response.returnValue || [];
          const pagination = response.pagination;
          const entities = this.buildEntities(returnData);
          this.entityCollection.pageIndex = pagination.pageIndex;
          this.entityCollection.pageSize = pagination.pageSize;
          this.entityCollection.totalCount = pagination.total;
          this.entityCollection.loadEntities(entities);
          return entities;
        } else {
          return [];
        }
      })
    );
  }
}
