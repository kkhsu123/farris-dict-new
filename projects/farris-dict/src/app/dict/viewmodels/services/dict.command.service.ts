import { Injectable } from "@angular/core";
import { FrameContext, BindingData, Repository } from "@farris/devkit";
import { Observable, empty, of } from "rxjs";
import { tap, map, delay, switchMap, catchError } from "rxjs/operators";
import { DictEntity } from "../../models/entities/dict.entity";
import { DictRepository } from "../../models/dict.repository";
@Injectable()
export class DictCommandService {
  private repository: DictRepository;
  private bindingData: BindingData;
  constructor(private frameContext: FrameContext) {
    this.repository = this.frameContext.repository as DictRepository;
    this.bindingData = this.frameContext.bindingData;
  }
  load(): Observable<any> {
    const pageIndex = this.bindingData.pagingInfo.pageIndex;
    const pageSize = this.bindingData.pagingInfo.pageSize;
    return this.repository.getEntities(null, null, pageSize, pageIndex).pipe(
      map(() => {
        return true;
      })
    );
    // return this.frameContext.repository.getList().pipe(
    //   tap(() => {
    //     var count = this.frameContext.repository.entityCollection.count();
    //     console.log("加载实体:" + count);
    //   })
    // );
  }
  add() {
    return this.frameContext.repository.create().pipe(
      tap(() => {
        var count = this.frameContext.repository.entityCollection.count();
      })
    );
  }
  edit() {
    var currentId = this.bindingData.list.currentId;
    if (!currentId) {
      alert("请选择数据");
      return empty();
    }
  }
  save() {
    var currentId = this.bindingData.list.currentId;
    if (!currentId) {
      alert("请选择数据");
    }
    return this.repository.applyChangesById(currentId).pipe(
      switchMap((result: boolean) => {
        if (result) {
          alert("保存成功");
          return this.load();
        } else {
          alert("保存失败");
        }
      }),
      catchError(() => {
        alert("保存失败");
        return of(false);
      })
    );
  }
  cancel() {
    return this.load().pipe(
      tap(() => {
        console.log("cancel");
      })
    );
  }
  remove() {
    var currentId = this.bindingData.list.currentId;
    if (!currentId) {
      alert("请选择数据");
      return empty();
    }
    return this.repository.removeById(currentId).pipe(
      switchMap((result: boolean) => {
        if (result) {
          alert("删除成功");
          return this.load();
        } else {
          alert("删除失败");
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
  close() {
    console.log("close");
  }
}
