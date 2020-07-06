import { Injectable } from "@angular/core";
import {
  NgCommandHandler,
  CommandHandler,
  CommandContext,
} from "@farris/devkit";
import { StateMachineService } from "@farris/command-services";
import { DictCommandService } from "../services/dict.command.service";

@Injectable()
@NgCommandHandler({
  commandName: "cancel",
})
export class CancelHandler extends CommandHandler {
  constructor(
    private commandService: DictCommandService,
    private stateMachineService: StateMachineService
  ) {
    super();
  }
  schedule() {
    this.addTask("cancel", (context: CommandContext) => {
      const args = [];
      return this.invoke(this.commandService, "cancel", args, context);
    });
    this.addTask("transit", (context: CommandContext) => {
      const args = ["cancelAction"];
      return this.invoke(this.stateMachineService, "transit", args, context);
    });
    this.addLink("cancel", "transit", true);
  }
}
