class AddImageUrlTextAuthor < ActiveRecord::Migration
  def change
    add_column :authors, :image_url, :string
    add_column :texts, :image_url, :string
  end
end
