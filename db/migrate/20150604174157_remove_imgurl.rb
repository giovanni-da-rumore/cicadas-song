class RemoveImgurl < ActiveRecord::Migration
  def change
    remove_column :authors, :image_url
  end
end
