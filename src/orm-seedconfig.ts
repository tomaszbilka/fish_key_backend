import ormconfig from './orm-config';

const ormseedconfig = {
  ...ormconfig,
  migrations: ['src/seeds/*.ts'],
};

export default ormseedconfig;
