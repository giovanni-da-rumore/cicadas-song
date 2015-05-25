class Text < ActiveRecord::Base
  include PgSearch
  multisearchable against: [:title, :author_name]
  #
  # pg_search_scope :author, associated_against: {
  #   author: [:name]
  # }

  validates :body, :title, :author, presence: true

  belongs_to :author, inverse_of: :texts

  belongs_to :uploader,
  class_name: "User",
  foreign_key: :user_id,
  primary_key: :id


  has_many :annotations, dependent: :destroy

  has_many :descriptions, dependent: :destroy


  has_many :libraries

  has_many :patrons, through: :libraries, as: :text

  def author_name
    self.author.name
  end


end


# a = Author.new
#
# Text.belongs_to :author
# Author.has_many :texts, inverse_of: :author
#
# t = a.texts.new
#
# t.author #=> nil
# a.texts #=> [t]
