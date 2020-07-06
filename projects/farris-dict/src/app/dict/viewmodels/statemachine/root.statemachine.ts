import { Injectable } from "@angular/core";
import {
  StateMachine,
  State,
  NgState,
  RenderState,
  NgRenderState,
  Action,
  NgAction,
} from "@farris/devkit";
@Injectable()
export class RootStateMachine extends StateMachine {
  @NgState({
    initialState: true,
  })
  initState: State;
  
  @NgState()
  addState: State;

  @NgState()
  editState: State;

  @NgAction({
    transitTo: "addState",
  })
  addAction: Action;

  @NgAction({
    transitTo: "editState",
  })
  editAction: Action;

  @NgAction({
    transitTo: "initState",
  })
  cancelAction: Action;

  @NgAction({
    transitTo: "initState",
  })
  saveAction: Action;

  @NgRenderState({
    render: (context: any) => context.state === "initState",
  })
  canAdd: RenderState;

  @NgRenderState({
    render: (context: any) => context.state === "initState",
  })
  canEdit: RenderState;

  @NgRenderState({
    render: (context: any) =>
      context.state === "addState" || context.state === "editState",
  })
  canCancel: RenderState;

  @NgRenderState({
    render: (context: any) =>
      context.state === "addState" || context.state === "editState",
  })
  canSave: RenderState;

  @NgRenderState({
    render: (context: any) => context.state === "initState",
  })
  canRemove: RenderState;

  @NgRenderState({
    render: (context: any) =>
      context.state === "addState" || context.state === "editState",
  })
  editable: RenderState;
}
