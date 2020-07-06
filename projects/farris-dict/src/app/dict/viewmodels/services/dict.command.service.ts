import { Injectable } from "@angular/core";
import { FrameContext, BindingData, Repository } from "@farris/devkit";
import { Observable } from "rxjs";
import { tap, map, delay } from "rxjs/operators";
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
    console.log("add");
  }
  edit() {
    console.log("edit");
  }
  save() {
    console.log("save");
  }
  cancel() {
    console.log("cancel");
  }
  remove() {
    console.log("remove");
  }
  close() {
    console.log("close");
  }
}
