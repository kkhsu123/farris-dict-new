import { Injectable } from '@angular/core';
import { NgCommandHandler, CommandHandler, CommandContext } from '@farris/devkit'
import { DictCommandService } from '../services/dict.command.service';
@Injectable()
@NgCommandHandler({
    commandName: 'save'
})
export class SaveHandler extends CommandHandler {
    constructor(
        private commandService: DictCommandService,
    ) {
        super();
    }
    schedule() {
        this.addTask('save', (context: CommandContext) => {
            const args = [
            ];
            return this.invoke(this.commandService, 'save', args, context);
        });
    }
}