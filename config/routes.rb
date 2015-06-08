Rails.application.routes.draw do

  root to: 'static_pages#root'

  resources :users

  resource :sessions, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :texts
    resources :annotations
    resources :descriptions
    resources :users
    resources :authors
    get "search", to: "static_pages#search"
    resources :postlets, only: [:create, :destroy, :update, :index]

  end




end
