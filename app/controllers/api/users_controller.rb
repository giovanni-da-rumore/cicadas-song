
class Api::UsersController < ApplicationController

  before_action :forbid_login, only: [:new, :create]

  # def new
  #   @user = User.new
  #   render json: @user
  # end
  #
  # def create
  #   @user = User.new(user_params)
  #   if @user.save
  #     login!(@user)
  #     redirect_to root_url
  #   else
  #     flash[:errors] = @user.errors.full_messages
  #     render :new
  #   end
  # end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def index
    @users = User.all
    render :index
  end

  def edit
  end

  def destroy
  end
end
