class DiscussionApp < Sinatra::Base
  get '/discussion' do
    "Hello World".to_json
  end
end
