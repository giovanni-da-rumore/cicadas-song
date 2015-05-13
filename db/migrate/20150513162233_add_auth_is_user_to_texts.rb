class AddAuthIsUserToTexts < ActiveRecord::Migration
  def change

    add_column :texts, :author_is_user, :boolean, default: false


  end

end
