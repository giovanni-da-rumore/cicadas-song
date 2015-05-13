class CreateAuthors < ActiveRecord::Migration
  def change
    create_table :authors do |t|
      t.string :name, null: false
      t.date :birth
      t.date :death
      t.timestamps null: false
    end


    add_index :authors, :name
    add_index :authors, :birth
    add_index :authors, :death

  end
end
