class DiscussionApp < Sinatra::Base
  get '/discussions' do
    "Hello World".to_json
  end
end
