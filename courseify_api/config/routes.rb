Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :videos
      resources :users
      post 'users/user_token' => 'user_token#create'
      get '/profile' => 'users#profile'
    end
  end
  # devise_for :users, controllers: {
  #   sessions: 'users/sessions'
  # }
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
