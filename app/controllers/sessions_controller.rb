class SessionsController < ApplicationController

  before_action :forbid_login, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.validate_credentials_username(user_params)
    if @user
      login!(@user)
      redirect_to users_url
    else
      render :new
    end
  end



  def destroy
    logout!
  end


end
