class DiscussionApp < Sinatra::Base
  get '/discussions' do
    protected!
    @discussions = this_user.discussions
    return @discussions.map{|d|
      @name = ""
      begin @name = d.name rescue @name = d.users_dataset.exclude(id: this_user.id).first.username end
      {
      id: d.id,
      name: @name
      }
    }.to_json
  end

  post '/discussions' do
    protected!
    @data = JSON.parse(request.body.read)
    @users = @data['users']
    if @users
      @existing = Discussion.where(@users.map{|u| User[u.to_s]}.push(this_user).map{|u| [users:u]}).first
      @users.map!{ |u| User[u] }
      if @users && !@existing
        @discussion = Discussion.new().save()
        @users.each{ |u| @discussion.add_user(u) }
        @discussion.add_user(this_user)
        halt 200
      end
    end
    halt 400
  end

  get '/discussions/:id' do
    protected!
    @discussion = this_user.discussions_dataset.where(id:params[:id]).first
    if @discussion
      return @discussion.links_dataset.order(:date).first(20).map{|l|
        {
          id: l.id,
          url: l.url,
          date: l.date,
          sender: l.user.username
        }
      }.to_json
    end
    halt 400
  end

  post '/discussions/:id' do
    protected!
    @discussion = this_user.discussions_dataset.where(id:params[:id]).first
    @data = JSON.parse(request.body.read)
    @url = @data['url']
    if @discussion && @url && /\./=~@url
      if !(@url[0..3] === "http")
        @url = 'http://'+@url
      end
      @link = Link.new(url:@url, date:DateTime.now, status:false, user_id:this_user.id).save
      @discussion.add_link(@link)
      halt 200
    end
    halt 400
  end

  helpers HelpersApp
end
