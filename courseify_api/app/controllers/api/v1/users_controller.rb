class Api::V1::UsersController < ApplicationController
    def create
    email = params[:email]
    password = params[:password]
    password_confirmation = params[:password_confirmation]

    # puts(params)

    u = User.new(email: email, password: password, password_confirmation: password_confirmation)
    if u.save
      render status: 200
    else 
      render json: { errors: u.errors }, status: 400
    end
  end
end
