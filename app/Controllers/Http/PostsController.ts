import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Post'

//import Posts from 'Database/migrations/1648933901778_posts'
import Database from '@ioc:Adonis/Lucid/Database'

import Post from 'App/Models/Post'

export default class PostsController {
  public async index({}: HttpContextContract) {
    const post = await Post.query().preload('user')
    return post
  }

  public async store({ request, auth }: HttpContextContract) {
    //const data = request.only(['title', 'content'])
    const data = await request.validate(StoreValidator)

    const user = await auth.authenticate()

    const post = await Post.create({ userId: user.id, ...data })

    post.preload('user')

    return post
  }

  public async show({ params, response }: HttpContextContract) {
    //const post = Database.rawQuery(`select * from posts where id = ${params.id}`)
    const post = await Post.findOrFail(params.id)

    if (!post) {
      return response.notFound({ error: { message: 'not found' } })
    }

    return post
  }

  public async update({ request, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    //const data = request.only(['title', 'content'])
    const data = await request.validate(UpdateValidator)
    post.merge(data)

    await post.save()

    return post
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}
