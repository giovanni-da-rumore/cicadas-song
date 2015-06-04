class RemoveImageUrls < ActiveRecord::Migration
  def change
    remove_column :authors, :orig_image_url
    remove_column :texts, :orig_image_url
  end
end
