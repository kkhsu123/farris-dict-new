import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ViewModel, NgCommand } from "@farris/devkit";
@Injectable()
export class RootViewModel extends ViewModel {
  bindingPath = "/";
  @NgCommand({
    name: "load",
  })
  load(): Observable<any> {
    return;
  }
  @NgCommand({
    name: "add",
  })
  add(): Observable<any> {
    return;
  }
  @NgCommand({
    name: "edit",
  })
  edit(): Observable<any> {
    return;
  }
  @NgCommand({
    name: "save",
  })
  save(): Observable<any> {
    return;
  }
  @NgCommand({
    name: "cancel",
  })
  cancel(): Observable<any> {
    return;
  }
  @NgCommand({
    name: "remove",
  })
  remove(): Observable<any> {
    return;
  }
  @NgCommand({
    name: "close",
  })
  close(): Observable<any> {
    return;
  }
}
