
module Api
  class Api::DescriptionsController < ApiController

    def new
      @description = Description.new()
      render :new
    end

    def create
      @description = current_user.descriptions.create(description_params)
      if @description.save
        redirect_to api_text_url(@description.text_id)
      else
        flash[:errors] = @description.errors.full_messages
        redirect_to api_text_url(description_params[:text_id])
      end


    end

    def show
    end

    def edit
    end

    def destroy
    end


    def description_params
      params.require(:description).permit(:content, :text_id)
    end

  end
end
