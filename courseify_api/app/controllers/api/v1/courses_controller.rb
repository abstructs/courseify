class Api::V1::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy]
  before_action :authenticate_user, only: [:create, :destroy]

  # GET /courses
  def index

    @courses = if params[:category] == "all" then Course.all else Course.where(category: params[:category]) end

    render json: { courses: as_json(@courses) } 
  end

  # GET /courses/1
  def show
    render json: { course: as_json(@course) }
  end

  # POST /courses
  def create
    @course = Course.new(course_params)
    @course.user_id = current_user.id
    # @course.user_id = current_user.id
    # @course.user = current_user

    valid_image = if course_params.has_key?(:image) then valid_image_type?(course_params[:image]) else nil end

    if @course.valid? && valid_image != false
      if course_params.has_key?(:image) then @course.image.attach(course_params[:banner]) end
      @course.save

      render json: @course, status: :created
    else
      if(!valid_image) then @course.errors.add(:image, 'must be jpeg, jpg, or png') end

      render json: { errors: @course.errors }, status: :unprocessable_entity
    end

  end

  # PATCH/PUT /courses/1
  def update
    # puts "\n\n\n"
    # puts course_params
    # puts "\n\n\n"
    if @course.update(course_params)
      render json: @course
    else
      render json: { errors: @course.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /courses/1
  def destroy
    @course.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_course
      @course = Course.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def course_params
      params.permit(:title, :url, :description, :author, :category, :image)
    end

    def as_json(course)
      course.to_json(include: { 
                                recommendations: { 
                                  include: { 
                                    user: { 
                                      only: [:id, :username] 
                                    } 
                                  } 
                                }
                              }
                )
    end

    private 

    def valid_image_type?(image_blob)    
      return image_blob.content_type.downcase.in?(%w(image/jpeg image/png image/jpg))
    end

    # def as_json
    #   {}
    # end
end
