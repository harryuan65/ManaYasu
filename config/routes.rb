# frozen_string_literal: true

Rails.application.routes.draw do
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resources :notes
  end
end
