class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    return @current_user if @current_user
    return current_session.user if current_session
  end

  def logged_in?
    !!current_user
  end

  def current_session
    @session_token || Session.find_by(content: session[:session_token])
  end

  def logout!
    current_session.destroy!
    session[:session_token] = nil
    redirect_to new_sessions_url
  end

  def login!(user)
    session_token = @user.set_session_token!
    session[:session_token] = session_token
  end


  def require_login
    redirect_to new_sessions_url unless logged_in?
  end

  def forbid_login
    redirect_to users_url if logged_in?
  end


  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def date_parser(date_hash)
    return nil if date_hash[:year] == ''
    return Date.new(date_hash[:year].to_i) if date_hash[:month] ==''
    if date_hash[:day] == ''
      return Date.new(date_hash[:year].to_i, date_hash[:month].to_i)
    else
      Date.new(date_hash[:year].to_i, date_hash[:month].to_i, date_hash[:day].to_i)
    end
  end


  def find_or_make_author(author_name)
    author = Author.find_by(name: author_name)
    if author
      return author
    else
      author = Author.new(name: author_name)
      author
    end
  end



end
