class FixPostOrderAgain < ActiveRecord::Migration
  def change
    remove_column :postlets, :post_order, :string
    add_column :postlets, :post_order, :integer
  end
end
