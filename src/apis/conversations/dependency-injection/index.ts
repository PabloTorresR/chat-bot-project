import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import { normalizePath } from '../utils/path';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'dev';

loader.load(`${normalizePath(__dirname)}/application_${env}.yaml`);

export default container;
