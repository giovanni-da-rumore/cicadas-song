module Api
  class PostletsController < ApiController

    def create
      @postlet = Postlet.new(postlet_params)

      if @postlet.save
        update_order
        update_text_image(@postlet)
        render json: @postlet
      else
        render json: @postlet.errors.full_messages, status: :uprocessable_entity
      end
    end


    def index
      @postlets = Postlet.all.order(:post_order).limit(15)
      render :index
    end

    def show
      @postlet = Postlet.find(params[:id])
      render json: @postlet
    end


    def update
      @postlet = Postlet.find(params[:id])
      if @postlet.update_attributes(postlet_params)
        update_text_image(@postlet)
       render json: @postlet
      else
       render json: @postlet.errors.full_messages, status: :unprocessable_entity
      end
    end



    def destroy
      @postlet = postlet(params[:id])
      @postlet.try(:destroy)
      render json: {}
    end


    private
    def postlet_params
      params.require(:postlet).permit(:description, :post_order, :text_id, :image_url)
    end

    def update_order
      Postlet.all.each do |postlet|
        if postlet.post_order.nil?
          postlet.post_order = 10
        else
          postlet.post_order += 1
        end
        postlet.save
      end
      delete_postlets
    end

    def delete_postlets
      Postlet.where('post_order > 20').destroy_all
    end


    def update_text_image(postlet)
      if postlet_params[:image_url]
        @text = Text.find(postlet.text_id)
        @text.image_from_url(postlet_params[:image_url])
        @text.save
      end
    end
  end
end
