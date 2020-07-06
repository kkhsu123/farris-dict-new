import { Injectable } from '@angular/core';
import { NgCommandHandler, CommandHandler, CommandContext } from '@farris/devkit'
import { DictCommandService } from '../services/dict.command.service';
@Injectable()
@NgCommandHandler({
    commandName: 'edit'
})
export class EditHandler extends CommandHandler {
    constructor(
        private commandService: DictCommandService,
    ) {
        super();
    }
    schedule() {
        this.addTask('edit', (context: CommandContext) => {
            const args = [
            ];
            return this.invoke(this.commandService, 'edit', args, context);
        });
    }
}