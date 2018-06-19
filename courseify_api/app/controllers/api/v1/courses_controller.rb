class Api::V1::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy]
  before_action :authenticate_user, only: [:create, :destroy]

  # GET /courses
  def index
    @courses = Course.all

    render json: { courses: @courses }
  end

  # GET /courses/1
  def show
    render json: @course
  end

  # POST /courses
  def create
    @course = Course.new(course_params)
    @course.user_id = current_user.id
    # @course.user_id = current_user.id
    # @course.user = current_user

    if @course.save
      render json: @course, status: :created
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /courses/1
  def update
    puts "\n\n\n"
    puts course_params
    puts "\n\n\n"
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors, status: :unprocessable_entity
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
      params.permit(:title, :url, :description, :author)
    end
end
