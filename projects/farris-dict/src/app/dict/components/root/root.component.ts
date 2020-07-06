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
  StateMachine,
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

import { RootStateMachine } from "../../viewmodels/statemachine/root.statemachine";
import { StateMachineService } from "@farris/command-services";
import { BehaviorSubject } from "rxjs";

import { DictMockDataService } from "../../models/services/dict-mock.data.service";
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

    StateMachineService,
    { provide: StateMachine, useClass: RootStateMachine },

    DictMockDataService,
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
      id: "toolbar-cancel",
      text: "取消",
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
  /**
   * 作为`<f-response-toolbar>`的`btnState`输入属性
   */
  toolbarDisableStates = new BehaviorSubject({});

  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {
    this.viewModel.load();
    // 监听状态机的状态迁移事件`stateChange`
    this.viewModel.stateMachine.stateChange.subscribe(() => {
      // 向`<f-response-toolbar>`广播最新的按钮禁用状态配置
      this.toolbarDisableStates.next({
        "toolbar-add": !this.viewModel.stateMachine["canAdd"],
        "toolbar-edit": !this.viewModel.stateMachine["canEdit"],
        "toolbar-save": !this.viewModel.stateMachine["canSave"],
        "toolbar-cancel": !this.viewModel.stateMachine["canCancel"],
        "toolbar-delete": !this.viewModel.stateMachine["canRemove"],
        "toolbar-close": false,
      });
    });
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
