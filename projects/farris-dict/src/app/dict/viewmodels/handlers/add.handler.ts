import { Injectable } from '@angular/core';
import { NgCommandHandler, CommandHandler, CommandContext } from '@farris/devkit'
import { DictCommandService } from '../services/dict.command.service';
@Injectable()
@NgCommandHandler({
    commandName: 'add'
})
export class AddHandler extends CommandHandler {
    constructor(
        private commandService: DictCommandService,
    ) {
        super();
    }
    schedule() {
        this.addTask('add', (context: CommandContext) => {
            const args = [
            ];
            return this.invoke(this.commandService, 'add', args, context);
        });
    }
}