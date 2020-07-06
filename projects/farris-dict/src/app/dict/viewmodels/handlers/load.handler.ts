import {
  CommandHandler,
  NgCommandHandler,
  CommandContext,
} from "@farris/devkit";
import { Injectable } from "@angular/core";
import { DictCommandService } from "../services/dict.command.service";
@Injectable()
@NgCommandHandler({
  commandName: "load",
})
export class LoadHandler extends CommandHandler {
  constructor(private commandService: DictCommandService) {
    super();
  }
  schedule() {
    this.addTask("load", (context: CommandContext) => {
      const args = [];
      return this.invoke(this.commandService, "load", args, context);
    });
  }
}
