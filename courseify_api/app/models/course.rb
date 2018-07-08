class Course < ApplicationRecord
  URL_REGEXP = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ix
  enum category: [:computer_science, :data_science, :other]
  belongs_to :user
  has_many :recommendations
  has_one_attached :image
  validates :category, presence: true
  validates :title, length: { in: 5..30 }, presence: true, on: [:create, :update]
  validates :author, presence: true
  validates :description, presence: true
  validates :url, :format => URI::regexp(%w(http https))

end
