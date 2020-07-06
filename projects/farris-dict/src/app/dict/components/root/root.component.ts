import { Component, OnInit, Injector } from "@angular/core";
import { ResponseToolbarClickEvent } from "@farris/ui-response-toolbar";

import {
  FARRIS_DEVKIT_FRAME_PROVIDERS,
  FrameComponent,
  FRAME_ID,
  Repository,
  ViewModel,
  BindingData,
} from "@farris/devkit";

import { DictRepository } from "../../models/dict.repository";
import { RootViewModel } from "../../viewmodels/root.viewmodel";
import { RootBindingData } from "../../viewmodels/bindingdata/root.bindingdata";
@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"],
  providers: [
    FARRIS_DEVKIT_FRAME_PROVIDERS,
    { provide: FRAME_ID, useValue: "root" },
    { provide: Repository, useClass: DictRepository },
    { provide: ViewModel, useClass: RootViewModel },
    { provide: BindingData, useClass: RootBindingData },
  ],
})
export class RootComponent extends FrameComponent implements OnInit {
  toolbarData = [
    {
      id: "toolbar-add",
      text: "新增",
      class: "btn-primary",
      disabled: false,
    },
    {
      id: "toolbar-edit",
      text: "编辑",
      disabled: false,
    },
    {
      id: "toolbar-save",
      text: "保存",
      disabled: false,
    },
    {
      id: "toolbar-delete",
      text: "删除",
      disabled: false,
    },
    {
      id: "toolbar-close",
      text: "关闭",
      disabled: false,
    },
  ];
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {}
  toolbarClickHandler(event: ResponseToolbarClickEvent) {
    alert("you click " + event.id + "!");
  }
}
