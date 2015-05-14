Rails.application.routes.draw do

  root 'static_pages#root'

  resources :users

  resource :sessions, only: [:new, :create, :destroy]

  namespace :api do
    resources :texts
    resources :annotations
    resources :descriptions
    resources :users, only: [:index, :show, :destroy]
    resources :authors
  end




end
