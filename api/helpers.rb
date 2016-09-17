module HelpersApp
  def protected!
    if authorized?
      true
    else
      halt 401
    end
  end

  def authorized?
    if session[:logged] != nil
      true
    else
      false
    end
  end

  def this_user
    if session[:logged]
      return User[session[:logged].to_i]
    end
  end
end
