class Text < ActiveRecord::Base
  validates :body, :title, presence: true

  belongs_to :author, inverse_of: :texts

  belongs_to :uploader,
  class_name: "User",
  foreign_key: :user_id,
  primary_key: :id


  has_many :annotations, dependent: :destroy

  has_many :descriptions, dependent: :destroy


  has_many :libraries

  has_many :patrons, through: :libraries, as: :text










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
