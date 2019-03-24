class V1::LibrariesController < ApplicationController
    def index
        @libraries = Library.order(:id)
        render json: @libraries, status: :ok
    end

    def create
        @library = Library.new(library_params)
        @library.save
        render json: @library, status: :created
    end

    def update
        @library = Library.find(params[:id])
        @library.update_attributes(library_params)
        render json: @library, status: :ok
    end

    private

    def library_params
        params.require(:library).permit(:number, :name, :address)
    end
end
