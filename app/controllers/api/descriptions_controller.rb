
module Api
  class DescriptionsController < ApiController

    def new
      @description = Description.new()
      render :new
    end

    def create
      @description = current_user.descriptions.create(description_params)
      if @description.save
        render json: @description
      else
        render json: @description
      end
    end

    def show
      @description = Description.find(params[:id])
      render json: @description
    end

    def edit
      @description = Description.find(params[:id])
      render json: @description
    end


    def update
      @description = Description.find(params[:id])
      @description.update_attributes(description_params)
      render json: @description
    end

    def destroy
    end


    def description_params
      params.require(:description).permit(:content, :text_id, :author_id)
    end

  end
end
