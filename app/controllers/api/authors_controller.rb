class Api::AuthorsController < ApplicationController

  def show
    @author = Author.find(params[:id])
    render :show
  end

  def index
    @authors = Author.all
    render json: @authors
  end

  def update
    @author = Author.find(params[:id])
    if author_params[:image_url]
      @author.image_from_url(author_params[:image_url])
    end
    # new_params = author_params
    # new_params.delete(:image_url)
    if @author.update_attributes(author_params)
      render json: @author
    else
      render json: @author.errors.full_messages, status: :unprocessable_entity
    end
  end


  def author_params
    params.require(:author).permit(:name, :image_url, :birth, :death)
  end



end
