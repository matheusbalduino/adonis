import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Posts from 'Database/migrations/1648933901778_posts'

//import Database from '@ioc:Adonis/Lucid/Database'

import Post from 'App/Models/Post'

export default class PostsController {
  public async index({}: HttpContextContract) {
    const post = await Post.all()

    return post
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'content'])
    console.log(data)

    const post = await Post.create(data)

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
    const data = request.only(['title', 'content'])

    post.merge(data)

    await post.save()

    return post
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}
