# frozen_string_literal: true

Rails.application.routes.draw do
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resources :notes do
      collection do
        post :check_params
      end
    end
  end
end
