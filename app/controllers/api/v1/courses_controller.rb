class Api::V1::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy]
  before_action :authenticate_user, only: [:create, :destroy, :delete_image]

  # GET /courses
  def index
    courses = if params[:category] == "all" then Course.all else Course.where(category: params[:category]) end

    render json: { courses: as_json(courses)  } #.reverse.collect { |c| json_with_image(c) }  }
  end

  # GET /courses/1
  def show
    course_id = params[:id]

    course = Course.find(course_id)

    render json: { course: get_json(course) }
  end

  # POST /courses
  def create
    @course = Course.new(course_params)
    @course.user_id = current_user.id
    # @course.user_id = current_user.id
    # @course.user = current_user

    valid_image = if course_params.has_key?(:image) then valid_image_type?(course_params[:image]) else true end

    if @course.valid? && valid_image
      if course_params.has_key?(:image) then @course.image.attach(course_params[:image]) end
      @course.save!

      render json: @course, status: :created
    else
      if(!valid_image) then @course.errors.add(:image, 'must be jpeg, jpg, or png') end
      
      puts @course.errors.messages

      render status: :unprocessable_entity
    end

  end

  def update
    @course = Course.find(params[:id])

    @course.assign_attributes(course_params.except(:image))
    valid_image = if course_params.has_key?(:image) then valid_image_type?(course_params[:image]) else nil end
  
    if current_user.id === @course.user_id && @course.valid? && valid_image != false
      if course_params.has_key?(:image) then @course.image.attach(course_params[:image]) end
        
      @course.save
      
      render status: :ok
    else
      if(!valid_image) then @course.errors.add(:image, 'must be jpeg, jpg, or png') end

      puts @course.errors.messages
      
      render status: :bad_request
    end 
  end

  # DELETE /courses/1
  def destroy
    @course.destroy
  end

  def delete_image
    @course = Course.find(params[:id])

    if @course.user_id == current_user.id
      if @course.image.attached?
        @course.image.destroy!
      end

      render status: :ok
    end
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

    def as_json(courses)
      courses.map { |course| 
        get_json(course)
      }
    end

    def get_json(course) 
      course.current_user_recommended = current_user_recommended(course)
      # course.image_url = image_url(course)

      course
    end

    private 

    def current_user_recommended course
      if current_user
        course.recommenders.exists?({ user_id: current_user.id })
      else 
        false
      end
    end

    # def image_url course
    #   if course.image.attached? then url_for(course.image) else nil end
    # end

    def valid_image_type?(image_blob)
      return image_blob.content_type.downcase.in?(%w(image/jpeg image/png image/jpg))
    end

end
