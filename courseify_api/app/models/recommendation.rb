class Recommendation < ApplicationRecord
  belongs_to :user
  belongs_to :course
  # validates :, prescence: true
end
