class Description < ActiveRecord::Base
  validates :content, :text_id, :author_id, presence: true
  validates :text_id, uniqueness: true

  belongs_to :text

  belongs_to :author,
  class_name: "User",
  foreign_key: :author_id,
  primary_key: :id

end
