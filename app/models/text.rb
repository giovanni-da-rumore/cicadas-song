class Text < ActiveRecord::Base
  validates :body, :author_id, :title, presence: true

  belongs_to :author,
  class_name: "Authors",
  foreign_key: :author_id,
  primary_key: :id


  







end
