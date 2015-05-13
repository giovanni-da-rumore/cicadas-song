module Api
  class Api::TextsController < ApplicationController

    def new
      @text = Text.new
      render :new
    end

    def create
    end

    def show
    end

    def index
    end

    def edit
    end

    def destroy
    end
  end

end
