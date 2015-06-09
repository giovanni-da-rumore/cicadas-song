class Postlet < ActiveRecord::Base
  validates :text_id, :description, :post_order, presence: true
  belongs_to :text


end
