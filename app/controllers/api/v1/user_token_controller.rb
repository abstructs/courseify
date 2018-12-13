class Api::V1::UserTokenController < Knock::AuthTokenController
    # Exception Handling
    class InvalidInfo < StandardError
        attr_accessor :errors
    end

    skip_before_action :verify_authenticity_token
    rescue_from InvalidInfo, with: :handleInvalidInfo
    # rescue_from InvalidPassword, with: :handleInvalidPassword


    def create
        render json: auth_token, status: :created
    end
    
    private

    def handleInvalidInfo(exception)
        render json: { errors: exception.errors }, status: :bad_request
    end

    # def handleInvalidPassword
    #     render json: { errors: { password: "Password is incorrect", type: "danger" }] }, status: 400
    # end

    def authenticate
        errors = {}
        if !entity.present?
            errors[:email] = ["Email does not exist in our database"]
        elsif !entity.authenticate(auth_params[:password])
            errors[:password] = ["Password is incorrect"]
        end

        if errors.length != 0
            exception = InvalidInfo.new
            exception.errors = errors
            raise exception
        end
    end
end
