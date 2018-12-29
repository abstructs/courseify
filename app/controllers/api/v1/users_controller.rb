class Api::V1::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user, only: [:profile, :update, :delete_banner, :follow, :unfollow]
  
  def index
    @users = User.select(User.column_names - ['password_digest', 'created_at', 'updated_at', 'sign_in_count'])

    render json: { users: @users }
  end

  def update
    @user = User.find(params[:id])

    @user.assign_attributes(update_params.except(:banner))

    # if params.has_key?(:banner)
    #   puts "banner"
    # end

    valid_banner = if update_params.has_key?(:banner) then valid_banner_type?(update_params[:banner]) else true end
    # && valid_banner != false

    if current_user.id === @user.id && @user.valid? && valid_banner
      if update_params.has_key?(:banner) then @user.banner.attach(update_params[:banner]) end

      @user.save!

      render status: :ok
    else 
      if(!valid_banner) then @user.errors.add(:banner, 'must be jpeg, jpg, or png') end

      puts @user.errors.messages

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

  def follow
    user = User.find(params[:user_id])

    if current_user && current_user.id != user.id

      current_user.follow(user)

      render status: :ok
    else 
      render status: 401
    end
  end

  def unfollow
    user = User.find(params[:user_id])

    if current_user && current_user.id != user.id

      current_user.unfollow(user)

      render status: :ok
    else 
      render status: 401  
    end
  end

  def show
    @user = User.find_by(username: params[:id])

    if @user

      render json: { user: get_json(@user) }
    else 
      render status: :not_found
    end
  end

  def profile
    @user = current_user

    if @user
      render json: { user: get_json(@user) }
    end
  end

  def profile_recommendations
    @user = User.find(params[:user_id])

    if @user
      render json: { recommendations: @user.recommendations }
    end
  end

  def username_taken
    username = user_params[:username]

    render json: { username_taken: User.exists?(username: username) }
  end

  def email_taken
    email = user_params[:email]

    render json: { email_taken: User.exists?(email: email) }
  end

  def create
    @user = User.new user_params

    if @user.save!
      render status: :ok, json: { jwt: get_token(@user) }
    else
      
      render status: :bad_request
    end
  end

  def delete_banner
    if current_user.banner.attached?
      current_user.banner.destroy!
    end

    render status: :ok
  end

  private

  def get_token(user)
    Knock::AuthToken.new(payload: { sub: { user: { user_id: user.id } } }).token
  end

  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end

  def update_params
    params.permit(:id, :first_name, :last_name, :headline, :education, :industry, :country, :summary, :banner)
  end

  def get_json user
    user.current_user_followed = current_user_followed(user)

    user
  end

  def current_user_followed user
    if current_user 
      current_user.following? user 
    else 
      false 
    end
  end

  def banner_url user
    if user.banner.attached? then url_for(banner.image) else nil end
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
