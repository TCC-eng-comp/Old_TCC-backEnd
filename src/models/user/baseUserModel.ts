import Role, { RoleTypes } from './roleModel'
import ArisError from '../../utils/arisError'
import { Transaction } from 'knex'
import db from '../../database'

interface Email {
  email: string
  main: boolean
  options?: { [key: string]: any }
}

export interface ArisBaseUser {
  user_id?: number
  name: string
  surname: string
  emails: Email[] | string
  avatar?: string
  birthday: string
  password: string
  created_at?: string
  updated_at?: string
}
// cant have more than one main email create a check!
export default class BaseUser {
  user_id: number
  name: string
  surname: string
  emails: Email[]
  avatar: string
  birthday: string
  password: string
  roles: RoleTypes[]
  created_at?: string
  updated_at?: string

  /**
   * Creates a base user.
   */
  constructor({ user_id, name, surname, emails, avatar, birthday, password, created_at, updated_at }: ArisBaseUser) {
    this.user_id = user_id || 0 //Gives a temporary id when creating a new user
    this.name = name
    this.surname = surname
    this.emails = typeof emails === 'string' ? [{ email: emails, main: true }] : emails
    this.avatar = avatar || 'default'
    this.birthday = birthday
    this.password = password
    this.roles = ['guest']
    this.created_at = created_at
    this.updated_at = updated_at
  }

  /**
   * Inserts this user in the database, if doesn't already registered.
   * @param User.password - needs to be hashed!
   */
  async insert() {
    const hasUser = await BaseUser.exist(this.emails[0].email)
    if (hasUser) throw new ArisError('User already exists!', 400)

    const trx = await db.transaction()

    const role = await Role.getRole(this.roles[0], trx)

    const user_id = await trx('user')
      .insert({
        name: this.name,
        surname: this.surname,
        birthday: this.birthday,
        password: this.password,
        active: true
      })
      .then(row => row[0])
    this.user_id = user_id

    await trx('email').insert({ user_id, email: this.emails[0].email, main: this.emails[0].main })

    await trx('user_role').insert({ role_id: role.role_id, user_id })

    await trx.commit()
  }

  /**
   * Updates this user in the database.
   * @param update.password - needs to be hashed!
   */
  async update(transaction?: Transaction) {
    const trx = transaction || db

    const user_up: Partial<this> = { ...this }
    delete user_up.user_id
    delete user_up.emails
    delete user_up.roles
    delete user_up.created_at
    delete user_up.updated_at

    await trx('user').update(user_up).where({ user_id: this.user_id })

    this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
  }

  /**
   * Delets this user in the database.
   */
  async delete(transaction?: Transaction) {
    const trx = transaction || db
    await trx('user').del().where({ user_id: this.user_id })
  }

  /**
   * Checks if an user (email) is already registered, and returns its id if so.
   */
  static async exist(email: string) {
    const user_id: number = await db('email')
      .select('user_id')
      .where({ email })
      .then(row => (row[0] ? row[0].user_id : null))
    return user_id
  }
}
