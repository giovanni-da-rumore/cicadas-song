
class Api::UsersController < ApplicationController

  before_action :forbid_login, only: [:new, :create]

  wrap_parameters false

  def show
    @user = User.find(params[:id])
    render :show
  end

  def index
    @users = User.all
    render :index
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes!(user_params)
  end

  def destroy
  end

  def user_params
    params.require(user).permit(:username, :email, :about, :image, :moderator)
  end



end
