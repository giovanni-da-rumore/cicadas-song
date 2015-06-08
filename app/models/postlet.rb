class Postlet < ActiveRecord::Base
  validates :text_id, :description, :order, presence: true
  belongs_to :text
  

end
