class UsersController < ApplicationController

  before_action :forbid_login, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
  end

  def index
    render :index
  end

  def edit
  end

  def destroy
  end

end
