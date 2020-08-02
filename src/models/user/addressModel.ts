import ArisError from '../arisErrorModel'
import { Transaction } from 'knex'
import db from '../../database'

export interface ArisAddress {
  id_address?: number
  city: string
  address: string
  postal_code: string
}

export default class Address {
  id_address: number
  city: string
  address: string
  postal_code: string

  /**
   * Create an address.
   */
  constructor({ id_address, city, address, postal_code }: ArisAddress) {
    this.id_address = id_address ? id_address : 0
    this.city = city
    this.address = address
    this.postal_code = postal_code
  }

  /**
   * Inserts this address in the database.
   */
  async insert(transaction?: Transaction) {
    const trx = transaction || (await db.transaction())

    const hasAddress = await Address.exist(this.city, this.address, this.postal_code)

    if (hasAddress) {
      this.id_address = hasAddress
      return
    }

    const city_id = await trx('city')
      .select('id_city')
      .where({ name: this.city })
      .then(row => row[0].id_city)

    const id = await trx('address')
      .insert({ address: this.address, postal_code: this.postal_code, city_id })
      .then(row => row[0])

    transaction || (await trx.commit())

    this.id_address = id
  }

  /**
   * Delets this address in the database.
   */
  async delete() {
    await db('address').del().where({ id_address: this.id_address })
  }

  /**
   * Checks if an address is already registered in the database.
   */
  static async exist(city: string, address: string, postal_code: string) {
    const address_id: number = await db('address_view')
      .select('id_address')
      .where({ city, address, postal_code })
      .then(row => (row[0] ? row[0].id_address : null))
    return address_id
  }

  /**
   * returns an address if it`s registered in the database.
   */
  static async getAddress(id_address: number) {
    const address_info = await db('address_view')
      .where({ id_address })
      .then(row => (row[0] ? row[0] : null))
    if (!address_info) throw new ArisError('Address not found!', 403)
    return new Address(address_info)
  }
}
