class CreateTexts < ActiveRecord::Migration
  def change
    create_table :texts do |t|
      t.string :title, null: false
      t.date :date
      t.text :body, null: false
      t.integer :author_id
      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index :texts, :title
    add_index :texts, :date
    add_index :texts, :author_id
    add_index :texts, :user_id
  end
end
