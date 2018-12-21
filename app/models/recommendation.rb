class Recommendation < ApplicationRecord
  belongs_to :user
  belongs_to :course
  # validates :, prescence: true

  def as_json(options={})
    super(options.merge(
      include: {
        course: { 
          include: {
            recommendations: { 
              include: { 
                user: { 
                  only: [:id, :username] 
                } 
              } 
            }
          }
        }
      } 
    ))
  end
end
