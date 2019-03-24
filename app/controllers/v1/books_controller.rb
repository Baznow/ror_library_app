class V1::BooksController < ApplicationController
    def index
        @books = Book.where(library_id: params[:library_id]).order(:id)
        render json: @books, status: :ok
    end
    
    def create
        @book = Book.new(book_params)
        @book.save
        render json: @book, status: :created
    end
    
    def update
        @book = Book.find(params[:id])
        @book.update_attributes(book_params)
        render json: @book, status: :ok
    end
    
    private
    
    def book_params
        params.require(:book).permit(:library_id, :title, :author, :mark, :publisher, :pub_date, :price, :ar_date)
    end
end
