class AddIndeciesToTates < ActiveRecord::Migration
  def change
    add_column :annotations, :start_index, :integer, null: false
    add_column :annotations, :end_index, :integer, null: false
  end
end
