class V1::BookPassesController < ApplicationController
    def index
        @book_passes = BookPass.joins(:book, :subscriber)
            .select('book_passes.*, books.title, subscribers.surname, subscribers.name')
            .where('books.library_id = ? and subscribers.library_id = ?', params[:id], params[:id])
        render json: @book_passes, status: :ok
    end

    def create
        @book_pass = BookPass.new(book_pass_params)
        @book_pass.save
        render json: @book_pass, status: :created
    end

    def update
        @book_pass = BookPass.find(params[:id])
        @book_pass.update_attributes(book_pass_params)
        render json: @book_pass, status: :ok
    end

    private

    def book_pass_params
        params.require(:book_pass).permit(:book_id, :subscriber_id, :pass_date, :return_date)
    end
end
