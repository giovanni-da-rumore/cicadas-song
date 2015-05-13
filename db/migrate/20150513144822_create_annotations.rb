class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :text_id, null: false
      t.integer :author_id, null: false
      t.text :content, null: false
      t.integer :score, default: 0

      t.timestamps null: false
    end

    add_index :annotations, :text_id
    add_index :annotations, :author_id
    add_index :annotations, :score


  end
end
