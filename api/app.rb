#!/usr/local/bin/ruby
require 'sinatra/base'
require 'sequel'
require 'json'
require 'bcrypt'

require './models'
require './helpers'
require './users'
require './discussions'

class Routes < Sinatra::Base
  post '/login' do
  end

  post '/signup' do
  end

  get('/users*') { UserApp.call(env) }
  get ('/discussions*') { DiscussionApp.call(env) }

  set :bind, '0.0.0.0'
  run!
end
