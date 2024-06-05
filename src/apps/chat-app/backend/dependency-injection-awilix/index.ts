import { InjectionMode, createContainer } from 'awilix';
import appDependencies from './apps';
import sharedDependencies from './Shared';
import conversationsDependencies from './Conversations';

const container = createContainer({ injectionMode: InjectionMode.PROXY });

container.register(sharedDependencies);
container.register(appDependencies);
container.register(conversationsDependencies);

export default container;
