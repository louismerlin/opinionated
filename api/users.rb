class UserApp < Sinatra::Base
  get '/users' do
    "Hello World".to_json
  end
end
