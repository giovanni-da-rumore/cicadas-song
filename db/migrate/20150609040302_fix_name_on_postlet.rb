class FixNameOnPostlet < ActiveRecord::Migration
  def change
    add_column :postlets, :post_order, :string
    remove_column :postlets, :order, :string
  end
end
