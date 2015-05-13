class Library < ActiveRecord::Base
  validates :user_id, :text_id, presence: true

  belongs_to :text
  belongs_to :user



end
