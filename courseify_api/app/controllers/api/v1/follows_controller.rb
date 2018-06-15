class Api::V1::FollowsController < ApplicationController
    before_action :authenticate_user, only: [:create, :destroy]
    def create
        user = User.find(params[:user_id])
        current_user.follow(user)

        # if current_user.follow(followed_user)
        #     render json: { messages: { text: "Successfully followed " + followed_user.full_name, type: "success" }}
        # else
        #     render json: { messages: error_messages(current_user)  }
        # end
    end

    def destroy
        user = User.find(params[:user_id])

        current_user.unfollow(user)
        # if 
        #     render json: { messages: { create_message(["Successfully unfollowed " + user.full_name], "success") }
        # else
        #     render json: { messages: error_messages(current_user) }
        # end
    end
end
