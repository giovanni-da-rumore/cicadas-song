class CreatePyongs < ActiveRecord::Migration
  def change
    create_table :pyongs do |t|
      t.integer :text_id
      t.integer :order
      t.string :description

      t.timestamps null: false
    end
    add_index :pyongs, :text_id
    add_index :pyongs, :order
  end


end
