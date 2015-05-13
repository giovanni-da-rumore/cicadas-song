class Text < ActiveRecord::Base
  validates :body, :author_id, :title, presence: true

  belongs_to :author

  belongs_to :uploader,
  class_name: "User",
  foreign_key: :user_id,
  primary_key: :id


  has_many :annotations, dependent: :destroy

  has_many :descriptions, dependent: :destroy


  has_many :libraries

  has_many :patrons, through: :libraries, as: :text










end
