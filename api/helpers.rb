module HelpersApp
  def protected!
    if authorized?
      true
    else
      halt 401
    end
  end

  def authorized?
    if session[:logged] == true
      true
    else
      false
    end
  end
end
