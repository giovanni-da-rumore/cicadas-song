class CreateDescriptions < ActiveRecord::Migration
  def change
    create_table :text_descriptions do |t|
      t.integer :text_id, null: false
      t.integer :author_id, null: false
      t.string :content
      t.integer :score, default: 0

      t.timestamps null: false
    end
    add_index :text_descriptions, :text_id, unique: true
    add_index :text_descriptions, :author_id

  end
end
