Rails.application.routes.draw do
  resources :users
  resources :user_routes
  get 'map_home/index'

  root 'map_home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users do 
    resources :user_routes
  end
end
