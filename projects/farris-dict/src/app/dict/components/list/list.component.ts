import { Component, OnInit, HostBinding, Injector } from "@angular/core";
import { DataColumn } from "@farris/ui-datagrid";

import {
  FrameComponent,
  FARRIS_DEVKIT_FRAME_PROVIDERS,
  FRAME_ID,
  ViewModel,
  BindingData,
  UIState,
} from "@farris/devkit";
import { ListViewModel } from "../../viewmodels/list.viewmodel";
import { ListBindingData } from "../../viewmodels/bindingdata/list.bindingdata";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  providers: [
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    { provide: FRAME_ID, useValue: "list" },
    { provide: ViewModel, useClass: ListViewModel },
    { provide: BindingData, useClass: ListBindingData },
  ],
})
export class ListComponent extends FrameComponent implements OnInit {
  viewModel: ListViewModel;
  @HostBinding("class.f-struct-wrapper")
  @HostBinding("class.f-utils-fill-flex-column")
  cls = true;
  columns: DataColumn[] = [
    { field: "id", width: 200, title: "标识" },
    { field: "code", width: 200, title: "编号" },
    { field: "name", width: 200, title: "名称" },
  ];
  data = [
    { id: "001", name: "A", code: "1" },
    { id: "002", name: "B", code: "2" },
    { id: "003", name: "C", code: "3" },
    { id: "004", name: "D", code: "4" },
    { id: "005", name: "E", code: "5" },
    { id: "006", name: "F", code: "6" },
    { id: "007", name: "G", code: "7" },
    { id: "008", name: "H", code: "8" },
  ];
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {}
}
