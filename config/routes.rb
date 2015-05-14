Rails.application.routes.draw do

  root 'static_pages#root'

  resources :users

  resource :sessions, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do 

    resources :texts
    resources :annotations
    resources :descriptions

    resources :users, only: [:show, :index, :destroy], defaults: {format: :json}


    resources :authors
  end




end
