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
      redirect_to "/"
    else
      @user = User.new(user_params)
      flash[:errors] = ["Incorrent username and password combination."]
      render :new
    end
  end



  def destroy
    logout!
  end


end
