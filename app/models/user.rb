class User < ApplicationRecord

  attr_reader :password


  validates :password, length: {minimum: 6}, allow_nil: true
  validates :email, :name, presence: true
  validates :email, uniqueness: true

  after_initialize :ensure_session_token
  
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest)
    .is_password?(password)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end


end
