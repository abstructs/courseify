class Api::V1::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user, only: [:profile, :update]
  
  def index
    @users = User.all

    render json: @users
  end

  def update
    @user = current_user
    puts "\n\n\n"
    puts params
    puts "\n\n\n"
    if @user.update(update_params)
        render status: 200
    else
      render json: { errors: @user.errors }, status: 400
    end 
  end

  def show
    @user = User.find(params[:id])
    
    if @user
      render json: { email: @user.email, id: @user.id }
    end
  end

  def profile
    @user = current_user

    if @user
      u = { 
        id: @user.id, 
        first_name: @user.first_name, 
        last_name: @user.last_name, 
        headline: @user.headline, 
        education: @user.education, 
        industry: @user.industry, 
        country: @user.country, 
        summary: @user.summary
      }

      render json: { user: u }
    end
  end

  def create
    u = User.new users_params

    if u.save
      render status: 200
    else
      render json: { errors: u.errors }, status: 400
    end
  end

  private

  def users_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def update_params
    params.permit(:first_name, :last_name, :headline, :education, :industry, :country, :summary)
  end

  # def find_param
  #   params.require()
  # end
end
