class V1::BookPassesController < ApplicationController
    def index
        @book_passes = BookPass.select('book_passes.*, books.title, subscribers.surname, subscribers.name')
            .joins(:book, :subscriber)
            .where('books.library_id = ? and subscribers.library_id = ?', params[:library_id], params[:library_id])
            .order(:id)
        render json: @book_passes, status: :ok
    end

    def create
        @book_pass = BookPass.new(book_pass_params)
        @book_pass.save
        @book_pass_format = BookPass.select('book_passes.*, books.title, subscribers.surname, subscribers.name')
            .joins(:book, :subscriber)
            .where('book_passes.id = ? and books.library_id = ? and subscribers.library_id = ?', @book_pass.id, params[:library_id], params[:library_id])
        render json: @book_pass_format, status: :created
    end

    def update
        @book_pass = BookPass.find(params[:id])
        @book_pass.update_attributes(book_pass_params)
        @book_pass_format = BookPass.select('book_passes.*, books.title, subscribers.surname, subscribers.name')
            .joins(:book, :subscriber)
            .where('book_passes.id = ? and books.library_id = ? and subscribers.library_id = ?', @book_pass.id, params[:library_id], params[:library_id])
        render json: @book_pass_format, status: :ok
    end

    private

    def book_pass_params
        params.require(:book_pass).permit(:book_id, :subscriber_id, :pass_date, :return_date)
    end
end
