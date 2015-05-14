module Api::TextsHelper


#   old controller code for rails app
#   def new
#     @text = Text.new
#     render :new
#   end
#
#   def create
#     parsed_params = parse_text_params
#     @text = current_user.uploaded_texts.create(parsed_params)
#
#     if @text.save
#       @text.author_id = find_or_make_author(text_params[:author])
#       @text.save!
#       redirect_to api_text_url(@text)
#     else
#       flash[:errors] = @text.errors.full_messages
#     render :new
#     end
#   end
#
#   def show
#     @text = Text.find(params[:id])
#     render :show
#   end
#
#   def index
#     @texts = Text.all
#     render :index
#   end
#
#   def edit
#     @text = Text.find(params[:id])
#     render :new
#   end
#
#   def destroy
#     @text = text(params[:id])
#     @text.try(:destroy)
#     render json: {}
#   end
#
#   private
#   def text_params
#     params.require(:text).permit(:author, :title, :body, date: [:year, :day, :month])
#   end
#
#   def user_is_editor
#     redirect_to api_texts_url unless current_user.moderator == true
#   end
#
#   def parse_text_params
#     parsed_params = text_params
#     parsed_params.delete(:author)
#     parsed_params[:date] = date_parser(text_params[:date])
#     parsed_params
#   end
# end
# end



###old text show

# <style>
#
# .text-show-container {
#   display: block;
#   margin: auto;
#   margin-left: 75px;
#   border-left: 1px solid #ccc;
#   padding-top: 20px;
#
# }
#
# .text-show-main {
#   display: block;
#   float: left;
#   width: 659px;
#   width: 60%;
#   margin-left: 15px;
#   /*margin-left: 75px;
#   border-left: 1px solid #ccc;*/
# }
#
#
# .show-description {
#   display: block;
#   float: left;
#   padding-right: 30px;
#   padding-left: 10px;
#   margin-top: 30px;
#   border-left: 1px solid #ccc;
#   border-right: 1px solid #ccc;
#   /*width: 350px;*/
#   width: 20%;
# }
#
#
# /*.show-description-right-line {
#   content: '';
#   display: block;
#   width: 0px;
#   height: 1000px;
#   border-right: 1px solid #ccc;
#   float: right;
#   pa-left: 20px;
#   margin-top: -200px;
#
# }*/
#
#
# .text-show-body {
#   font-size: 16px;
#   padding: 5px 0px;
#   padding-right: 15px;
# }
#
#
# .text-show-header {
#   border-bottom: 1px solid #ccc;
# }
#
# .show-title {
#   font-size: 28px;
#   font-weight: 200px;
#   padding-bottom: 5px;
# }
#
# .show-author {
#   font-size: 20px;
#   font-weight: 150px;
#   padding-bottom: 5px;
# }
#
#
# .description-content {
#   padding-bottom: 10px;
# }
#
#
#
#
# </style>
#
#
#
# <div class="text-show-container group">
# <section class="text-show-main">
#   <header class="text-show-header">
#     <h1 class="show-title"> <%= @text.title %> </h1>
#     <h3 class="show-author"> <%= @text.author.name %> </h3>
#   </header>
#   <nav class="text-show-nav">
#   </nav>
#   <section class="text-show-body">
#     <%=@text.body %>
#   </section>
# </section>
#
#
# <section class="show-description">
#   <% if @text.descriptions.length > 0 %>
#     <%= render "/api/descriptions/show", description: @text.descriptions[0] %>
#   <% else %>
#     <%= render "/api/descriptions/new", description: Description.new, text: @text  %>
#   <% end %>
#   <!-- <div class="show-description-right-line">
#   </div> -->
# </section>
#
#
#
#
# <section class="text-show-comment-form">
#   <!-- insert comment form -->
# </section>
#
# </div>
end
