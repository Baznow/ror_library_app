class V1::SubscribersController < ApplicationController
    def index
        @subscribers = Subscriber.where(library_id: params[:library_id]).order(:id)
        render json: @subscribers, status: :ok
    end

    def create
        @subscriber = Subscriber.new(subscriber_params)
        @subscriber.save
        render json: @subscriber, status: :created
    end

    def update
        @subscriber = Subscriber.find(params[:id])
        @subscriber.update_attributes(subscriber_params)
        render json: @subscriber, status: :ok
    end

    private

    def subscriber_params
        params.require(:subscriber).permit(:library_id, :card_num, :surname, :name, :patronymic, :address, :phone)
    end
end
