import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PostsController.index')
Route.post('/', 'PostsController.store')
