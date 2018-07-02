class Api::V1::RecommendationsController < ApplicationController
  before_action :set_recommendation, only: [:show, :update]
  before_action :authenticate_user, only: [:create, :update]

  # GET /recommendations
  def index
    @recommendations = if params[:user_id] then Recommendation.where(user_id: params[:user_id]) else Recommendation.all end

    render json: { recommendations: @recommendations.to_json( include: {
                                                                course: { 
                                                                  include: {
                                                                    recommendations: { 
                                                                      include: { 
                                                                        user: { 
                                                                          only: [:id, :username] 
                                                                        } 
                                                                      } 
                                                                    }
                                                                  }
                                                                }
                                                              } 
                                                            )
                  }
  end

  # GET /recommendations/1
  def show
    render json: @recommendation
  end

  # def search
  #   # query = 

  #   puts Recommendation.find_by params[:by]: params[:query]
  # end

  # POST /recommendations
  def create
    @recommendation = current_user.recommendations.new(recommendation_params)
    # @recommendation.user_id = current_user.id

    if @recommendation.save
      render json: @recommendation, status: :created
    else
      render json: @recommendation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /recommendations/1
  def update
    if current_user.id == @recommendation.user_id && @recommendation.update(recommendation_params)
      render json: @recommendation
    else
      render json: @recommendation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /recommendations/1
  def destroy
    @recommendation = current_user.recommendations.find_by(recommendation_params)
    @recommendation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recommendation
      @recommendation = Recommendation.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def recommendation_params
      params.permit(:course_id)
    end
end
