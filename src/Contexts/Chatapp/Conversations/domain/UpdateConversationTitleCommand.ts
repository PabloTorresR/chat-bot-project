import { Command } from 'shared-context/domain/Command';

type Params = {
    id: string;
    title: string;
};

export class UpdateConversationTitleCommand extends Command {
    id: string;
    title: string;

    constructor({ id, title }: Params) {
        super();
        this.id = id;
        this.title = title;
    }
}
