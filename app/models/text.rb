class Text < ActiveRecord::Base
  include PgSearch
  multisearchable against: [:title, :author_name]

  has_attached_file :image, default_url: "boreas.jpg",
        styles: {:medium => "300x300>", :thumb => "100x100>"}
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/


  validates :body, :title, :author, presence: true

  belongs_to :author, inverse_of: :texts

  belongs_to :uploader,
  class_name: "User",
  foreign_key: :user_id,
  primary_key: :id


  has_many :annotations, dependent: :destroy

  has_many :descriptions, dependent: :destroy

  has_many :postlets, dependent: :destroy


  has_many :libraries

  has_many :patrons, through: :libraries, as: :text

  def author_name
    self.author.name
  end

  def image_from_url(url)
    self.image = URI.parse(url)
  end

end
