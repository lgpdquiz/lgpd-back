import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createAnswers1590970678241 implements MigrationInterface {

    private table = new Table({
        name: 'answers',
        columns: [{
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            isNullable: false,
            generationStrategy: 'increment',
        },
        {
            name: 'answer',
            type: 'varchar',
            length: '255',
            isNullable: false,
        },
        {
            name: 'questionId',
            type: 'integer',
            isUnique: false,
            isNullable: false,
        },
        {
            name: 'isCorrect',
            type: 'boolean',
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

    public foreignKey = new TableForeignKey({
        columnNames: ['questionId'],
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        referencedTableName: 'question',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
