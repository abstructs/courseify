class Api::V1::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user, only: [:profile]
  def index
    @users = User.all

    render json: @users
  end

  def show
    @user = User.find(params[:id])
    
    if @user
      render json: { email: @user.email }
    end
  end

  def profile
    puts "ay"
    @user = current_user

    if @user
      render json: { email: @user.email }
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

  # def find_param
  #   params.require()
  # end
end
