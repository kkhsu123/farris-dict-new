import { Injectable } from '@angular/core';
import { NgCommandHandler, CommandHandler, CommandContext } from '@farris/devkit'
import { DictCommandService } from '../services/dict.command.service';
@Injectable()
@NgCommandHandler({
    commandName: 'cancel'
})
export class CancelHandler extends CommandHandler {
    constructor(
        private commandService: DictCommandService,
    ) {
        super();
    }
    schedule() {
        this.addTask('cancel', (context: CommandContext) => {
            const args = [
            ];
            return this.invoke(this.commandService, 'cancel', args, context);
        });
    }
}