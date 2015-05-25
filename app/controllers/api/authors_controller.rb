class Api::AuthorsController < ApplicationController

  def show
    @author = Author.find(params[:id])
    render :show
  end

  def index
    @authors = Author.all
    render json: @authors
  end


end
