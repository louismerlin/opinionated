#!/usr/local/bin/ruby
require 'sinatra/base'
require 'json'

require './models'
require './users'
require './discussions'

class Routes < Sinatra::Base
  get('/users*') { UserApp.call(env) }
  get ('/discussions*') { DiscussionApp.call(env) }

  set :port, 8080
  set :bind, '0.0.0.0'
  run!
end
