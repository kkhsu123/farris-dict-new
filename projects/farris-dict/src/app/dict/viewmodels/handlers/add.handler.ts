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
  commandName: "add",
})
export class AddHandler extends CommandHandler {
  constructor(
    private commandService: DictCommandService,
    private stateMachineService: StateMachineService
  ) {
    super();
  }
  schedule() {
    this.addTask("add", (context: CommandContext) => {
      const args = [];
      return this.invoke(this.commandService, "add", args, context);
    });

    this.addTask("transit", (context: CommandContext) => {
      const args = ["addAction"];
      return this.invoke(this.stateMachineService, "transit", args, context);
    });
    this.addLink("add", "transit", true);
  }
}
