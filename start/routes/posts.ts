import Route from '@ioc:Adonis/Core/Route'

Route.resource('/posts', 'PostsController')
  .apiOnly()
  .middleware({
    index: ['auth'],
    store: ['auth'],
    update: ['auth'],
    destroy: ['auth'],
  })
