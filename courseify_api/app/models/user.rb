class User < ApplicationRecord
  has_secure_password
  # attr_accessor :password, :salt, :password_confirmation
  
  validates_format_of :email, :with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  # validates :password, :email, presence: true
  validates :password, length: { in: 6..20 }
  validates :email, uniqueness: true
  validate :check_password_confirmation

  # before_save :hash_password, :if => proc{ |u| !u.password.blank? }
  

  # protected

  # def hash_password
  #   self.salt = BCrypt::Engine.generate_salt
  #   self.password_digest = BCrypt::Engine.hash_secret(password, salt)
  # end

  def check_password_confirmation
    errors.add(:password, " and password confirmation do not match") if password != password_confirmation
  end 
end
