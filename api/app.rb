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
    @username = params['username']
    @password = params['password']
    if @username && @password
      @user = User.where(username: @username).first
      if @user && BCrypt::Password.new(@user.password) == @password
        session[:logged] = @user.id
        200
      else
        halt 401
      end
    else
      halt 400
    end
  end

  post '/signup' do
    @username = params['username']
    @password = params['password']
    if @username && @password
      if !User.where(username: @username).first
        User.new(
          username: @username,
          password: BCrypt::Password.create(@password)
        ).save
        200
      else
        halt 400, 'Username already taken'
      end
    else
      halt 400, 'Username or password cannot be empty'
    end
  end

  get('/users*') { UserApp.call(env) }
  get ('/discussions*') { DiscussionApp.call(env) }

  set :bind, '0.0.0.0'
  run!
end
