Rails.application.routes.draw do

  root 'users#index'

  resources :users

  resource :sessions, only: [:new, :create, :destroy]



end
