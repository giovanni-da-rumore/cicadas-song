class Author < ActiveRecord::Base
  include PgSearch
  multisearchable against: [:name]

  validates :name, presence: true, uniqueness: true

  has_many :texts, inverse_of: :author


end
