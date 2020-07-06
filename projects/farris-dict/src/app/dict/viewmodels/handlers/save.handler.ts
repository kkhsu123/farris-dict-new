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
  commandName: "save",
})
export class SaveHandler extends CommandHandler {
  constructor(
    private commandService: DictCommandService,
    private stateMachineService: StateMachineService
  ) {
    super();
  }
  schedule() {
    this.addTask("save", (context: CommandContext) => {
      const args = [];
      return this.invoke(this.commandService, "save", args, context);
    });
    this.addTask("transit", (context: CommandContext) => {
      const args = ["saveAction"];
      return this.invoke(this.stateMachineService, "transit", args, context);
    });
    this.addLink("save", "transit", true);
  }
}
