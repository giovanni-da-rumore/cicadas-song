class Api::StaticPagesController < ApplicationController

  def search
    @search_results = PgSearch.multisearch(params[:query])
    .page(params[:page])
    # fail
    render :search
  end

end
