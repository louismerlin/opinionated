class UserApp < Sinatra::Base
  get '/users/:username' do
    protected!
    @user = User.where(username: params[:username]).first
    if @user
      return @user.id.to_json
    end
    halt 400
  end

  helpers HelpersApp
end
