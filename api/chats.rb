class ChatApp < Sinatra::Base
  get '/chats' do
    protected!
    @chats = this_user.chats
    return @chats.map{|c|
      @name = ""
      begin @name = c.name rescue @name = c.users_dataset.exclude(id: this_user.id).first.username end
      {
      id: c.id,
      name: @name
      }
    }.to_json
  end

  post '/chats' do
    protected!
    @data = JSON.parse(request.body.read)
    @users = @data['users']
    if @users
      @existing = Chat.where(@users.map{|u| User[u.to_s]}.push(this_user).map{|u| [users:u]}).first
      @users.map!{ |u| User[u] }
      if @users && !@existing
        @chat = Chat.new().save()
        @users.each{ |u| @chat.add_user(u) }
        @chat.add_user(this_user)
        halt 200
      end
    end
    halt 400
  end

#BOTH ARE PROBLEMATIC (??!!!)

  get '/chat/:id' do
    protected!
    @chat = this_user.chats_dataset.where(id:params[:id]).first
    if @chat
      return @chat.chats_dataset.order(:date).first(20).map{|c|
        {
          id: c.id,
          message: c.url,
          date: c.date,
          sender: c.user_id
        }
      }.to_json
    end
    halt 400
  end

  post '/chats/:id' do
    protected!
    @chat = this_user.chats_dataset.where(id:params[:id]).first
    @data = JSON.parse(request.body.read)
    @message = @data['message']
    if @chat && @message
      @chat = Chat.new(message:@message, date:DateTime.now, user_id:this_user.id).save
      @chat.add_link(@message)
      halt 200
    end
    halt 400
  end

  helpers HelpersApp
end
