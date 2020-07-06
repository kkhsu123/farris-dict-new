import { DefaultRepository, NgRepository } from "@farris/devkit";
import { DictEntity } from "./entities/dict.entity";
import { Injectable, Injector } from "@angular/core";
import {
  DictMockDataService,
  ResponseInfo,
  DictData,
} from "./services/dict-mock.data.service";
import { Observable, of } from "rxjs";
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

  /*
   * 创建实体
   */
  create(): Observable<any> {
    return this.dataService.getDefaultValue().pipe(
      map((response: ResponseInfo) => {
        if (response.code == "0" && response.returnValue.length > 0) {
          const data = response.returnValue[0];
          const entity = this.buildEntity(data);
          this.entityCollection.addEntity(entity);
          return true;
        }
      })
    );
  }
  /**
   * 提交根实体的变更
   * @param id 提交变更实体的标识
   */
  applyChangesById(id: string): Observable<boolean> {
    if (!id) {
      return of(false);
    }
    var entity = this.entityCollection.getEntityById(id);
    if (entity) {
      return this.dataService.save(entity.toJSON() as DictData).pipe(
        map((response) => {
          if (response.code == "0") {
            return true;
          } else {
            return false;
          }
        })
      );
    } else {
      return of(false);
    }
  }
  /**
   * 删除实体
   * @param id 所要删除实体的标识
   * @param ifSave 是否执行持久化
   */
  removeById(id: string, ifSave?: boolean): Observable<any> {
    if (!id) {
      return of(false);
    }
    return this.dataService.remove(id).pipe(
      map((response) => {
        if (response.code == "0") {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
