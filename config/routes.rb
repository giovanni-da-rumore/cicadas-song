Rails.application.routes.draw do

  root 'users#index'

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
