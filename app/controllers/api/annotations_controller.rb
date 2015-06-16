module Api
  class AnnotationsController < ApiController
		before_action :user_is_moderator, only: :destroy

  	def new
  	end

  	def create
      @annotation = current_user.annotations.new(annotation_params)
      @annotation.save!
      render json: @annotation
  	end

  	def show
  	end

    def update
      @annotation = Annotation.find(params[:id])
      @annotation.update_attributes!(annotation_params)
      render json: @annotation
    end


  	def destroy
      @annotation = Annotation.find(params[:id])
      @annotation.destroy!
      render json: "Success!"
  	end

  	def annotation_params
  		params.require(:annotation).permit(:text_id, :author_id, :content,
  		:score, :start_index, :end_index)
    end


    def user_is_moderator
      current_user.moderator
    end
  end
end
