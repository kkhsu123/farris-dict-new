import { Injectable } from '@angular/core';
import { NgCommandHandler, CommandHandler, CommandContext } from '@farris/devkit'
import { DictCommandService } from '../services/dict.command.service';
@Injectable()
@NgCommandHandler({
    commandName: 'close'
})
export class CloseHandler extends CommandHandler {
    constructor(
        private commandService: DictCommandService,
    ) {
        super();
    }
    schedule() {
        this.addTask('close', (context: CommandContext) => {
            const args = [
            ];
            return this.invoke(this.commandService, 'close', args, context);
        });
    }
}