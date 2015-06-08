class AddImageUrlPostlet < ActiveRecord::Migration
  def change
    add_column :postlets, :image_url, :string
  end
end
