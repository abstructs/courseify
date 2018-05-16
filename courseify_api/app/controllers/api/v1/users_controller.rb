class Api::V1::UsersController < ApplicationController
    def create
    u = User.new users_params

    puts u
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
