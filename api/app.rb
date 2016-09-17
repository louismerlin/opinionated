#!/usr/local/bin/ruby
require 'sinatra/base'
require 'sequel'
require 'json'
require 'bcrypt'
require 'date'

require './models'
require './helpers'
require './users'
require './discussions'

class Routes < Sinatra::Base
  post '/login' do
    @data = JSON.parse(request.body.read)
    @username = @data['username']
    @password = @data['password']
    if @username && @password
      @user = User.where(username: @username).first
      if @user && BCrypt::Password.new(@user.password) == @password
        session[:logged] = @user.id
        halt 200, 'true'.to_json
      else
        halt 401, 'Wrong password'
      end
    else
      halt 400, 'Username or password cannot be empty'
    end
  end

  post '/signup' do
    @data = JSON.parse(request.body.read)
    @username = @data['username']
    @password = @data['password']
    @password_confirmation = @data['password_confirmation']
    if @username && @password && @password == @password_confirmation
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
  post('/users*') { UserApp.call(env) }
  get('/discussions*') { DiscussionApp.call(env) }
  post('/discussions*') { DiscussionApp.call(env) }

  set :bind, '0.0.0.0'
	use Rack::Session::Cookie, :key => 'rack.session', :path => '/', :secret => 'Opinions!!'
  run!
end
