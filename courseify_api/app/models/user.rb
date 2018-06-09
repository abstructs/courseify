class User < ApplicationRecord
  has_secure_password
  # attr_accessor :password, :salt, :password_confirmation
  
  validates_format_of :email, :with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  # validates :password, :email, presence: true
  validates :password, length: { in: 6..20 }, on: :create
  validates :email, uniqueness: true, on: :create
  validate :check_password_confirmation, on: :create

  # validates :password, length: { in: 6..20 }, on: :update, if :password_changed?
  # validates :email, uniqueness: true, on: :update, if :password_changed?
  # validate :check_password_confirmation, on: :update, if :password_changed?

  # before_save :hash_password, :if => proc{ |u| !u.password.blank? }
  

  # protected

  # def hash_password
  #   self.salt = BCrypt::Engine.generate_salt
  #   self.password_digest = BCrypt::Engine.hash_secret(password, salt)
  # end

  def check_password_confirmation
    errors.add(:password, " and password confirmation do not match") if password != password_confirmation
  end 

  def self.from_token_request request
    # Returns a valid user, `nil` or raise `Knock.not_found_exception_class_name`
    # e.g.
    email = request.params["auth"] && request.params["auth"]["email"]
    self.find_by email: email
  end

  private

  def password_changed?
    !self.password.blank?
  end
end
