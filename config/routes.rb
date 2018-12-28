Rails.application.routes.draw do
  resources :curriculums
  namespace :api do
    namespace :v1 do
      post 'users/user_token' => 'user_token#create'

      delete 'courses/:id/image' => 'courses#delete_image'
      delete 'users/:id/banner' => 'users#delete_banner'
      
      get '/profile/:user_id/recommendations' => 'users#profile_recommendations'
      get '/courses/search' => 'recommendations#search'
      delete '/recommendations' => 'recommendations#destroy'
      put 'users/:user_username' => 'users#update'

      post 'users/follow/:user_id' => 'users#follow'
      delete 'users/unfollow/:user_id' => 'users#unfollow'

      post 'users/profile' => 'users#profile'
      post 'users/username_taken' => 'users#username_taken'
      post 'users/email_taken' => 'users#email_taken'

      resources :videos
      resources :users do
        get :followers, :following
      end
      resources :courses
      resources :follows, param: :user_id
      resources :recommendations

    end
  end
  # devise_for :users, controllers: {
  #   sessions: 'users/sessions'
  # }
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
