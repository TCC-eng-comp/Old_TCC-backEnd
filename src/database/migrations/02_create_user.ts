import knex from 'knex'

export async function up(knex: knex) {
  return knex.schema
    .createTable('user', table => {
      table.increments('user_id').primary()
      table.boolean('active').notNullable()
      table.string('name', 40).notNullable()
      table.string('surname', 40).notNullable()
      table.string('email', 50).notNullable().unique()
      table.string('password', 100).notNullable()
      table.string('phone', 20).unique()
      table.date('birthday').notNullable()
      table.dateTime('created_at').notNullable()
      table.dateTime('updated_at').notNullable()
      table.integer('address_id').unsigned().references('address_id').inTable('address')
    })
    .then(() =>
      knex.schema.createTable('role', table => {
        table.increments('role_id').primary()
        table.string('title', 30).notNullable().unique()
      })
    )
    .then(() =>
      knex.schema.createTable('role_user', table => {
        table.integer('user_id').unsigned().references('user_id').inTable('user').notNullable()
        table.integer('role_id').unsigned().references('role_id').inTable('role').notNullable()
      })
    )
    .then(() =>
      knex.schema.createTable('customer', table => {
        table.increments('customer_id').primary()
        table.integer('user_id').unsigned().references('user_id').inTable('user').notNullable().unique()
      })
    )
    .then(() =>
      knex.schema.createTable('student', table => {
        table.increments('student_id').primary()
        table.integer('user_id').unsigned().references('user_id').inTable('user').notNullable().unique()
      })
    )
    .then(() =>
      knex.schema.createTable('professor', table => {
        table.increments('professor_id').primary()
        table.integer('user_id').unsigned().references('user_id').inTable('user').notNullable().unique()
      })
    )
    .then(() =>
      knex.schema.createTable('proponent', table => {
        table.increments('proponent_id').primary()
        table.integer('user_id').unsigned().references('user_id').inTable('user').notNullable().unique()
      })
    )
    .then(() =>
      knex.raw(`
      CREATE OR REPLACE VIEW user_view AS
        SELECT 
            u.user_id,
            u.active,
            u.name,
            u.surname,
            u.email,
            u.password,
            u.phone,
            u.birthday,
            u.created_at,
            u.updated_at,
            r.title AS 'role',
            a.address_id,
            a.address,
            a.postal_code,
            a.city,
            a.district,
            a.country
        FROM
            user u
                LEFT JOIN
            address_view a ON u.address_id = a.address_id
                LEFT JOIN
            role_user ru ON u.user_id = ru.user_id
                LEFT JOIN
            role r ON ru.role_id = r.role_id
                LEFT JOIN
            student ON u.user_id = student.user_id
                LEFT JOIN
            professor ON u.user_id = professor.user_id
                LEFT JOIN
            proponent ON u.user_id = proponent.user_id
                LEFT JOIN
            customer ON u.user_id = customer.user_id;
      `)
    )
}

export async function down(knex: knex) {
  return knex
    .raw(`DROP VIEW user_view;`)
    .then(() => knex.schema.dropTable('proponent'))
    .then(() => knex.schema.dropTable('professor'))
    .then(() => knex.schema.dropTable('student'))
    .then(() => knex.schema.dropTable('customer'))
    .then(() => knex.schema.dropTable('role_user'))
    .then(() => knex.schema.dropTable('role'))
    .then(() => knex.schema.dropTable('user'))
}
