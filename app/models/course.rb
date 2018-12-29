class Course < ApplicationRecord  
  include Rails.application.routes.url_helpers

  attr_accessor :image_url
  attr_accessor :current_user_recommended

  # URL_REGEXP = /^(http|https|):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ix
  URL_REGEXP = URI::regexp
  enum category: [:computer_science, :data_science, :other]
  belongs_to :user

  has_many :recommenders, class_name: "Recommendation",
                          foreign_key: "course_id",
                          dependent: :destroy


  has_one_attached :image
  validates :category, presence: true
  validates :title, length: { in: 5..30 }, presence: true, on: [:create, :update]
  validates :author, presence: true
  validates :description, presence: true
  validates :url, :format => URI::regexp(%w(http https))

  def as_json(options={})
    super(options.merge({
      methods: [:image_url, :current_user_recommended],
      include: {
        recommenders: { 
          include: {
            user: {
              only: [:id, :username]
            } 
          } 
        }
      }
    }))
  end
end
