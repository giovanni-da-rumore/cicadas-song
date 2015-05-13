class CreateLibraries < ActiveRecord::Migration
  def change
    create_table :libraries do |t|
      t.integer :user_id
      t.integer :text_id
      t.timestamps null: false
    end

    add_index :libraries, :user_id
    add_index :libraries, :text_id
  end
end
