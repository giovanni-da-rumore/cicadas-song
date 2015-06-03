require "open-uri"


class Author < ActiveRecord::Base
  include PgSearch
  multisearchable against: [:name, :text_titles]

  has_attached_file :image, default_url: "david_bowie.jpg",
        styles: {:medium => "300x300>", :thumb => "100x100>"}
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/


  validates :name, presence: true, uniqueness: true

  has_many :texts, inverse_of: :author

  def text_titles
    titles = []
    self.texts.each {|text| titles << text.title}
    titles
  end

  def image_from_url(url)
    self.image = URI.parse(url)
  end



end
