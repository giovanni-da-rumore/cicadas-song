class Author < ActiveRecord::Base
  include PgSearch
  multisearchable against: [:name, :text_titles]

  validates :name, presence: true, uniqueness: true

  has_many :texts, inverse_of: :author

  def text_titles
    titles = []
    self.texts.each {|text| titles << text.title}
    titles
  end



end
