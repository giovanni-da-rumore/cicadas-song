class Annotation < ActiveRecord::Base
  validates :text_id, :content_id, :content, presence: true

  belongs_to :text

  belongs_to :author,
  class_name: "User",
  foreign_key: :author_id,
  primary_key: :id





end
