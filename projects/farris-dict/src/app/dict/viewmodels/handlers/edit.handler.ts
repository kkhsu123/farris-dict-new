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
  commandName: "edit",
})
export class EditHandler extends CommandHandler {
  constructor(
    private commandService: DictCommandService,
    private stateMachineService: StateMachineService
  ) {
    super();
  }
  schedule() {
    this.addTask("edit", (context: CommandContext) => {
      const args = [];
      return this.invoke(this.commandService, "edit", args, context);
    });

    this.addTask("transit", (context: CommandContext) => {
      const args = ["editAction"];
      return this.invoke(this.stateMachineService, "transit", args, context);
    });
    this.addLink("edit", "transit", true);
  }
}
