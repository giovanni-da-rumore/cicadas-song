
module Api
  class TextsController < ApiController

    before_action :user_is_editor, only: [:destroy, :edit]

    def new
      @text = Text.new
      render :new
    end

    def create
      parsed_params = parse_text_params
      @author = find_or_make_author(text_params[:author])
      @text = @author.texts.new(parsed_params)
      @text.body = parse_text_body(@text.body)
      if @text.save
        @author.save
        render json: @text
      else
        render json: @text.errors.full_messages, status: :uprocessable_entity
      end
    end

    def show
      @text = Text.find(params[:id])
      render :show
    end

    def index
      @texts = Text.order(:created_at).limit(8).reverse_order
      render :index
    end


    def update
      @text = Text.find(params[:id])
      if text_params[:image_url]
        @text.image_from_url(text_params[:image_url])
      end
      if @text.update_attributes(text_params)
       render json: @text
      else
       render json: @text.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @text = text(params[:id])
      @text.try(:destroy)
      render json: {}
    end


    private
    def text_params
      params.require(:text).permit(:author, :title, :body, :user_id, :image_url, date: [:year, :day, :month])
    end

    def user_is_editor
      redirect_to api_texts_url unless current_user.moderator == true
    end

    def parse_text_params
      parsed_params = text_params
      parsed_params.delete(:author)
      parsed_params[:date] = date_parser(text_params[:date])
      parsed_params
    end

    def parse_text_body(body)
      new_body = body.strip
      new_body = body.gsub(/[^\S\n]+/, " ")
      new_body = new_body.gsub(/\n[^\S\n]/, "\n")
      new_body = new_body.gsub(/[^\S\n]\n/, "\n")
      new_body = new_body.gsub(/\r/, "")
      new_body
    end
  end
end
