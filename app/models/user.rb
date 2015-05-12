class User < ActiveRecord::Base
  validates :username, :email, :password_digest, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  attr_reader :password

  has_many :sessions

  #to do
  #has_many :library_texts, through: :library_join, as: :texts
  #has_many :authored_texts, through: author_join, as: texts 



  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest) == password
  end


  def self.validate_credentials_username(creds)
    user = User.find_by(username: creds[:username])
    if user
      return user if user.is_password?(creds[:password])
    end
    nil
  end

  def set_session_token!
    session = Session.new(user_id: self.id)
    token = session.generate_new_session_token!
    token
  end

end
