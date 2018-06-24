class ApplicationController < ActionController::API
    include Knock::Authenticable

    private

    def error_messages(entity, type="danger")
        puts entity.errors
        entity.errors.full_messages.map { |txt| { text: txt, type: type, class_name: entity.class.name } }
    end

    def create_message(text, type="success")
        { text: text, type: type }
    end

    # def authenticate_api_v1_user
    #     authenticate_for Api::V1::User
    # end

    # private

    # def unauthorized_entity(entity_name)
    #   puts "HEllo"
    #   render json: ["Unauthorized"], status: :unauthorized
    # end
end
