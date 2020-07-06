import { Injectable } from "@angular/core";
@Injectable()
export class DictCommandService {
  load() {
    console.log("load");
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
