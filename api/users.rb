class UserApp < Sinatra::Base
  get '/users/:id' do
    protected!
    'Hello World'.to_json
  end

  helpers HelpersApp
end
