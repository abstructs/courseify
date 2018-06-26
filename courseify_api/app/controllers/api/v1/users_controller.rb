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

  def followers
    u = User.find(params[:user_id])

    render json: { followers: u.followers }
  end

  def following
    u = User.find(params[:user_id])

    render json: { following: u.following }
  end

  def show
    @user = User.find(params[:id])
    
    if @user
      u = user_data(@user)
      # u[:follow_info] = follow_info = if current_user 
      #                                 then { 
      #                                   follow_id: current_user.active_follows.find_by(followed_id: @user.id).try(:id),
      #                                   is_following: current_user.following?(@user) }
      #                                 else { is_following: false }
      #                                 end

      u[:is_current_user_profile] = current_user == @user
      u[:current_user_is_following] = current_user.following?(@user)

      render json: { user: u }
    end
  end

  def profile
    @user = current_user

    if @user
      u = user_data(@user)

      u[:is_current_user_profile] = true
      
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
      # render json: { messages: error_messages(@user, "danger") }, status: 400
      render json: { errors: @user.errors.as_json(full_messages: true) }, status: 400
    end
  end

  private

  def users_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def update_params
    params.permit(:id, :user, :first_name, :last_name, :headline, :education, :industry, :country, :summary)
  end

  def user_data(user)
    { 
      id: user.id, 
      first_name: user.first_name, 
      last_name: user.last_name, 
      headline: user.headline, 
      education: user.education, 
      industry: user.industry, 
      country: user.country, 
      summary: user.summary,
      recommendationsCount: user.recommendations.count,
      followerCount: user.followers.count,
      followingCount: user.following.count,
    }
  end

  # def find_param
  #   params.require()
  # end
end
