class User < ActiveRecord::Base
  include PgSearch
  multisearchable against: :username

  validates :username, :email, :password_digest, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  has_attached_file :avatar, default_url: "david_bowie.jpg",
        styles: {:medium => "300x300>", :thumb => "100x100>"}
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  attr_reader :password

  has_many :sessions, dependent: :destroy

  has_many :uploaded_texts,
  class_name: "Text",
  foreign_key: :user_id,
  primary_key: :id

  has_many :annotations, dependent: :destroy,
  class_name: "Annotation",
  foreign_key: :author_id,
  primary_key: :id

  has_many :descriptions, dependent: :destroy,
  class_name: "Description",
  foreign_key: :author_id,
  primary_key: :id

  has_many :libraries, dependent: :destroy

  has_many :library_texts, through: :libraries, as: :text

  def authored_texts
    texts = self.uploaded_texts.where(author_is_user: true)
  end

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
