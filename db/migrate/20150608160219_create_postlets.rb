class CreatePostlets < ActiveRecord::Migration
  def change
    create_table :postlets do |t|
      t.integer :text_id
      t.integer :order
      t.string :description
      t.timestamps null: false
    end
    add_index :postlets, :text_id
    add_index :postlets, :order
  end
end
