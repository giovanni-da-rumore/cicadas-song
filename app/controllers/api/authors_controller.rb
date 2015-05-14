class Api::AuthorsController < ApplicationController

  def show
    @author = Author.find(params[:id])
    render json: @author
  end


end
