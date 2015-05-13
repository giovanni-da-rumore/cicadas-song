class AddAdminAndScoreOnUsers < ActiveRecord::Migration
  def change

    add_column :users, :moderator, :boolean, default: false
    add_column :users, :score, :integer, default: 0

  end
end
