class Session < ActiveRecord::Base
  validates :user_id, :content, presence: true
  validates :content, uniqueness: true

  belongs_to :user

  #reloafter_initialize :new_session_body

  def generate_new_session_token!
    self.content = generate_unique_token(:content)
    self.save!
    self.content
  end

  def reset_session_token!
    self.content = generate_unique_token(:content)
    self.save!
    self.content
  end


  def new_session_content
    self.content = generate_unique_token(:content)
  end


  def generate_unique_token(field)
    begin
      token = SecureRandom.urlsafe_base64(16)
      end until !self.class.exists?(field => token)
    token
  end

end
