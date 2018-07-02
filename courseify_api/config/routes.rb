Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :videos
      resources :users, param: :username do
        get :followers, :following
      end
      resources :courses
      resources :follows, param: :user_id
      resources :recommendations
      post 'users/user_token' => 'user_token#create'
      get '/profile' => 'users#profile'
      get '/profile/:user_id/recommendations' => 'users#profile_recommendations'
      get '/courses/search' => 'recommendations#search'
      delete '/recommendations' => 'recommendations#destroy'
    end
  end
  # devise_for :users, controllers: {
  #   sessions: 'users/sessions'
  # }
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
