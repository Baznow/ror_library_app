class Library < ApplicationRecord
    has_many :employees
    has_many :books
    has_many :subscribers
end
