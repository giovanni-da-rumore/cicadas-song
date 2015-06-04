class AddAttachmentImageToTexts < ActiveRecord::Migration
  def self.up
    change_table :texts do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :texts, :image
  end
end
