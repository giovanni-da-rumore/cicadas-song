module Api
  class PostletsController < ApiController

    def create
      @postlet = Postlet.new(pyong_params)
      if @postlet.save
        update_order
        render json: @postlet
      else
        render json: @postlet.errors.full_messages, status: :uprocessable_entity
      end
    end


    def index
      @postlets = Postlet.all.order(:order).limit(15)
      render :index
    end


    def destroy
      @postlet = postlet(params[:id])
      @postlet.try(:destroy)
      render json: {}
    end


    private
    def pyong_params
      params.require(:postlet).permit(:description, :order, :text_id, :image_url)
    end

    def update_order
      Postlet.all.each do |postlet|
        postlet.order += 1
        postlet.save
      end
      delete_postlets
    end

    def delete_postlets
      Postlet.where('order > 20').destroy_all
    end


  end
end
