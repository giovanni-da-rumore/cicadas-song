class Author < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :texts, inverse_of: :author


end
