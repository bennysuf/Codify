Rails.application.routes.draw do
  resources :profiles
  # resources :contact_forms
  resources :dev_projects
  resources :projects
  # resources :projects, exluding: [:index]
  resources :developers, exluding: [:destroy]
  get "/admin", to: "developers#show"
  post "/signup", to: "developers#create"
  post "/login", to: "session#create"
  delete "/logout", to: "session#destroy"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"
end
