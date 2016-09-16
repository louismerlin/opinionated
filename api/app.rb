#!/usr/local/bin/ruby
require 'sinatra'

get '/' do
  'Hello World'
end

set :bind, '0.0.0.0'
