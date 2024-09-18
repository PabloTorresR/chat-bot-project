import { Command } from 'shared-context/domain/Command';

type Params = {
  id: string;
};

export class DeleteConversationCommand extends Command {
  id: string;

  constructor({ id }: Params) {
    super();
    this.id = id;
  }
}
