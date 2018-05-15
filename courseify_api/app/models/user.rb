class User < ApplicationRecord
  # before_save :hash_password, :if => proc{ |u| !u.password.blank? }

  # protected
  # def hash_password
  #   self.salt = BCrypt::Engine.generate_salt
  #   self.password_hash = BCrypt::Engine.hash_secret(password, salt)
  # end
end
