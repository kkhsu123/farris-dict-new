import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ViewModel, NgCommand } from "@farris/devkit";
@Injectable()
export class ListViewModel extends ViewModel {
  bindingPath = "/";
  @NgCommand({
    name: "load",
  })
  load(): Observable<any> {
    return;
  }
}
