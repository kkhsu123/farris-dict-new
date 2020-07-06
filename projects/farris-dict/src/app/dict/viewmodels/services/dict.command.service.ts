import { Injectable } from "@angular/core";
import { FrameContext } from "@farris/devkit";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
@Injectable()
export class DictCommandService {
  constructor(private frameContext: FrameContext) {}
  load(): Observable<any> {
    return this.frameContext.repository.getList().pipe(
      tap(() => {
        var count = this.frameContext.repository.entityCollection.count();
        console.log("加载实体:" + count);
      })
    );
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
