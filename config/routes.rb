Rails.application.routes.draw do
  resources :contact_forms
  resources :dev_projects
  resources :projects
  resources :developers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"
end
