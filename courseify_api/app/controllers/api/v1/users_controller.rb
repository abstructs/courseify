class Api::V1::UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token

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
end
