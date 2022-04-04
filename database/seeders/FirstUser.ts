import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class FirstUserSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'matheus@gmail.com',
        password: '123456',
        role: 'normal'
      },
      {
        email: 'admin@gmail.com',
        password: '123456',
        role: 'admin'
      }
    ])
  }
}
