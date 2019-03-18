Rails.application.routes.draw do
  root to: 'page#index'
  namespace :v1 do
    resources :libraries, :employees, :books, :subscribers, :book_passes, :top_books
  end
  match '*path', to: 'page#index', via: :all
end
