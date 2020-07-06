import { Injectable } from '@angular/core';
import { NgCommandHandler, CommandHandler, CommandContext } from '@farris/devkit'
import { DictCommandService } from '../services/dict.command.service';

@Injectable()
@NgCommandHandler({
    commandName: 'remove'
})
export class RemoveHandler extends CommandHandler {
    constructor(
        private commandService: DictCommandService,
    ) {
        super();
    }
    schedule() {
        this.addTask('remove', (context: CommandContext) => {
            const args = [
            ];
            return this.invoke(this.commandService, 'remove', args, context);
        });
    }
}