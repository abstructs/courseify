

class Course < ApplicationRecord  
  include Rails.application.routes.url_helpers

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

  def attributes_with_image_url
    as_json.merge({image_url: image_url})
  end

  def as_json(options={})
    super(options.merge(include: {
      recommendations: { 
        include: { 
          user: { 
            only: [:id, :username] 
          } 
        } 
      }
    }))
  end
end
