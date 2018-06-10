class Api::V1::UserTokenController < Knock::AuthTokenController
    # Exception Handling
    class InvalidEmail < StandardError
    end

    class InvalidPassword < StandardError
    end

    skip_before_action :verify_authenticity_token
    rescue_from InvalidEmail, with: :handleInvalidEmail
    rescue_from InvalidPassword, with: :handleInvalidPassword


    def create
        render json: auth_token, status: :created
    end
    
    private

    def handleInvalidEmail
        render json: { errors: { "email": [" does not exist in our database"] } }, status: 400
    end

    def handleInvalidPassword
        render json: { errors: { "password": [" is incorrect"] } }, status: 400
    end

    def authenticate
        # puts(auth_params)
        if !entity.present?
            raise InvalidEmail
        elsif !entity.authenticate(auth_params[:password])
            raise InvalidPassword
        end
    end
end
