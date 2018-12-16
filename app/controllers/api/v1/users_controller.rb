class Api::V1::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user, only: [:profile, :update, :profile]
  
  def index
    @users = User.select(User.column_names - ['password_digest', 'created_at', 'updated_at', 'sign_in_count'])

    render json: { users: @users }
  end

  def update
    @user = current_user

    @user.assign_attributes(update_params.except(:banner))
    valid_banner = if update_params.has_key?(:banner) then valid_banner_type?(update_params[:banner]) else nil end
  
    if current_user[:id].to_i == params[:id].to_i && @user.valid? && valid_banner != false
      if update_params.has_key?(:banner) then @user.banner.attach(update_params[:banner]) end
        
      @user.save
      render status: 200
    else
      if(!valid_banner) then @user.errors.add(:banner, 'must be jpeg, jpg, or png') end

      puts @user.errors
      
      render status: :bad_request
    end 
  end

  def followers
    @user = User.find(params[:user_id])

    followers = @user.followers.map do |user| user_data(user) end

    render json: { followers: followers }
  end

  def following
    @user = User.find(params[:user_id])

    following = @user.following.map do |user| user_data(user) end

    render json: { following: following }
  end

  def show
    @user = User.find_by(username: params[:id])

    if @user
      u = user_data(@user)
      # u[:follow_info] = follow_info = if current_user 
      #                                 then { 
      #                                   follow_id: current_user.active_follows.find_by(followed_id: @user.id).try(:id),
      #                                   is_following: current_user.following?(@user) }
      #                                 else { is_following: false }
      #                                 end
      if(current_user)
        u[:is_current_user_profile] = current_user.id == @user.id
        u[:current_user_is_following] = current_user.following?(@user)
      end 

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

    if @user.save!
      render status: :ok, json: { token: "Bearer: get_token(@user)" }
    else
      
      render status: :bad_request
    end
  end

  private

  def get_token(user)
    Knock::AuthToken.new(payload: { sub: user.id }).token
  end

  def users_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end

  def update_params
    params.permit(:id, :username, :user, :first_name, :last_name, :headline, :education, :industry, :country, :summary, :banner)
  end

  def user_data(user)
    { 
      id: user.id, 
      banner_url: if user.banner.attached? then url_for(user.banner) else false end,
      email: user.email,
      username: user.username,
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

  def valid_banner_type?(banner_blob)    
    return banner_blob.content_type.downcase.in?(%w(image/jpeg image/png image/jpg))
  end

  # def find_param
  #   params.require()
  # end
end
