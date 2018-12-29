class Recommendation < ApplicationRecord
  belongs_to :user
  belongs_to :course
  # validates :, prescence: true

  def course_json
    course.as_json
  end

  alias_method :course_json, :course

  def as_json(options={})
    json = super(options.merge({}))
    
    json[:course] = course_json

    json
  end
end
