import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createQuestions1590970539353 implements MigrationInterface {

    private table = new Table({
        name: 'questions',
        columns: [{
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
            isGenerated: true, //semelhante a Auto-increment
            generationStrategy: 'increment',
        },
        {
            name: 'question',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
        },
        {
            name: 'created_at',
            type: 'timestamptz', //formato de data 
            isNullable: false,
            default: 'now()',
        },
        {
            name: 'updated_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
        },]
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);  
    }

}
