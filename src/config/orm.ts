import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';


const options : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'lgpdtrivia',
    logging: true,
    entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
    migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
    synchronize: true,
    cli : {
        entitiesDir : 'src/db/models'
    }
}

const cli = options.cli.entitiesDir 

module.exports = options;