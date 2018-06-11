class Api::V1::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user, only: [:profile, :update, :profile]
  
  def index
    @users = User.select(User.column_names - ['password_digest', 'created_at', 'updated_at', 'sign_in_count'])

    render json: { users: @users }
  end

  def update
    @user = current_user

    if current_user[:id].to_i == update_params[:id].to_i && @user.update(update_params)
        render status: 200
    else
      render json: { errors: @user.errors }, status: 400
    end 
  end

  def show
    @user = User.find(params[:id])
    
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
        summary: @user.summary,
        recommendationsCount: @user.recommendations.count
      }

      render json: { user: u }
    end
  end

  def profile_recommendations
    @user = User.find(params[:user_id])

    if @user
      render json: { recommendations: @user.recommendations }
    end
  end

  def create
    @user = User.new users_params

    if @user.save
      render status: 200
    else
      render json: { messages: flash_messages(@user, "danger") }, status: 400
    end
  end

  private

  def users_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def update_params
    params.permit(:id, :user, :first_name, :last_name, :headline, :education, :industry, :country, :summary)
  end

  # def find_param
  #   params.require()
  # end
end
