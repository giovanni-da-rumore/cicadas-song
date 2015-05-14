class CreateDescriptions < ActiveRecord::Migration
  def change
    create_table :descriptions do |t|
      t.integer :text_id, null: false
      t.integer :author_id, null: false
      t.string :content
      t.integer :score, default: 0

      t.timestamps null: false
    end
    add_index :descriptions, :text_id, unique: true
    add_index :descriptions, :author_id

  end
end
