class ApplicationController < ActionController::API
    include Knock::Authenticable

    private

    # def authenticate_api_v1_user
    #     authenticate_for Api::V1::User
    # end

    # private

    # def unauthorized_entity(entity_name)
    #   puts "HEllo"
    #   render json: ["Unauthorized"], status: :unauthorized
    # end
end
