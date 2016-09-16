#!/usr/local/bin/ruby
require 'sinatra/base'
require 'sequel'
require 'json'

require './models'
require './users'
require './discussions'

class Routes < Sinatra::Base
  get('/users*') { UserApp.call(env) }
  get ('/discussions*') { DiscussionApp.call(env) }

  set :bind, '0.0.0.0'
  run!
end
