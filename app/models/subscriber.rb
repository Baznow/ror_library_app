class Subscriber < ApplicationRecord
    belongs_to :library
    has_many :book_passes
end
