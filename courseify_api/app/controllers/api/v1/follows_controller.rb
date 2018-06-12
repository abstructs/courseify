class Api::V1::FollowsController < ApplicationController
    before_action :authenticate_user, only: [:create, :destroy]
    def create
        followed_user = User.find(params[:followed_id])
        current_user.follow(followed_user)

        # if current_user.follow(followed_user)
        #     render json: { messages: { text: "Successfully followed " + followed_user.full_name, type: "success" }}
        # else
        #     render json: { messages: error_messages(current_user)  }
        # end
    end

    def destroy
        user = Follow.find(params[:id]).followed

        current_user.unfollow(user)
        # if 
        #     render json: { messages: { create_message(["Successfully unfollowed " + user.full_name], "success") }
        # else
        #     render json: { messages: error_messages(current_user) }
        # end
    end
end
