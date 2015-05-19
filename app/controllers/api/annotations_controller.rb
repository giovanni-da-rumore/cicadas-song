module Api
  class AnnotationsController < ApiController
		before_action :user_is_editor, only: [:destroy, :edit]

  	def new
  	end

  	def create
      @annotation = current_user.annotations.new(annotation_params)
      @annotation.save!
      render json: @annotation
  	end

  	def show
  	end

  	def edit
  	end

  	def update
  	end

  	def destroy
  	end

  	def annotation_params
  		params.require(:annotation).permit(:text_id, :author_id, :content,
  		:score, :start_index, :end_index)
    end
  end
end
