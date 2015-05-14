
module Api
  class Api::TextsController < ApiController

    before_action :user_is_editor, only: [:destroy, :edit]

    def new
      @text = Text.new
      render :new
    end

    def create
      parsed_params = parse_text_params
      @text = current_user.uploaded_texts.create(parsed_params)

      if @text.save
        @text.author_id = find_or_make_author(text_params[:author])
        @text.save!
        redirect_to api_text_url(@text)
      else
        flash[:errors] = @text.errors.full_messages
      render :new
      end
    end

    def show
      @text = Text.find(params[:id])
      render :show
    end

    def index
      @texts = Text.all
      render :index
    end

    def edit
      @text = Text.find(params[:id])
      render :new
    end

    def destroy
      @text = text(params[:id])
      @text.try(:destroy)
      render json: {}
    end

    private
    def text_params
      params.require(:text).permit(:author, :title, :body, date: [:year, :day, :month])
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
  end
end