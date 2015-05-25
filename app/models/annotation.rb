class Annotation < ActiveRecord::Base
  validates :text_id, :author_id, :content, presence: true

  validate :is_not_nested, on: :create

  belongs_to :text

  belongs_to :author,
  class_name: "User",
  foreign_key: :author_id,
  primary_key: :id


  def is_not_nested
    error_message = "An annotation cannot contain other annotations"
		self.text.annotations.each do |annotation|
			if (start_index >= annotation.start_index && end_index <= annotation.end_index)
        errors.add(:index, error_message)
        return false

      elsif (self.start_index <= annotation.end_index && annotation.end_index <= self.end_index)
        errors.add(:index, error_message)
        return false

      elsif (self.start_index <= annotation.start_index && annotation.start_index <= self.end_index)
        errors.add(:index, error_message)
        return false
      end
    end
  end



end
