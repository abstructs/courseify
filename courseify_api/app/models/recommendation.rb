class Recommendation < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :url, presence: true
  validates :author, presence: true
  # validates :, prescence: true
end
