import { Component, OnInit, Injector } from "@angular/core";
import { ResponseToolbarClickEvent } from "@farris/ui-response-toolbar";

import {
  FARRIS_DEVKIT_FRAME_PROVIDERS,
  FrameComponent,
  FRAME_ID,
  Repository,
  ViewModel,
  BindingData,
  COMMAND_HANDLERS_TOKEN,
} from "@farris/devkit";

import { DictRepository } from "../../models/dict.repository";
import { RootViewModel } from "../../viewmodels/root.viewmodel";
import { RootBindingData } from "../../viewmodels/bindingdata/root.bindingdata";

import { LoadHandler } from "../../viewmodels/handlers/load.handler";
import { AddHandler } from "../../viewmodels/handlers/add.handler";
import { EditHandler } from "../../viewmodels/handlers/edit.handler";
import { SaveHandler } from "../../viewmodels/handlers/save.handler";
import { CancelHandler } from "../../viewmodels/handlers/cancel.handler";
import { RemoveHandler } from "../../viewmodels/handlers/remove.handler";
import { CloseHandler } from "../../viewmodels/handlers/close.handler";
import { DictCommandService } from "../../viewmodels/services/dict.command.service";
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

    { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadHandler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: AddHandler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: EditHandler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: SaveHandler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CancelHandler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: RemoveHandler, multi: true },
    { provide: COMMAND_HANDLERS_TOKEN, useClass: CloseHandler, multi: true },
    DictCommandService,
  ],
})
export class RootComponent extends FrameComponent implements OnInit {
  viewModel: RootViewModel;
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
  ngOnInit() {
    this.viewModel.load();
  }
  toolbarClickHandler(event: ResponseToolbarClickEvent) {
    switch (event.id) {
      case "toolbar-add":
        this.viewModel.add();
        break;
      case "toolbar-edit":
        this.viewModel.edit();
        break;
      case "toolbar-save":
        this.viewModel.save();
        break;
      case "toolbar-cancel":
        this.viewModel.cancel();
        break;
      case "toolbar-delete":
        this.viewModel.remove();
        break;
      case "toolbar-close":
        this.viewModel.close();
        break;
    }
  }
}
