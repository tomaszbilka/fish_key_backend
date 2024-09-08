import { DataSource } from 'typeorm';
import ormSeedConfig from './orm-seedconfig';

export default new DataSource(ormSeedConfig);
