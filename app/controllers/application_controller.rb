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
    redirect_to new_user_url unless logged_in?
  end

  def forbid_login
    redirect_to users_url if logged_in?
  end


  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
