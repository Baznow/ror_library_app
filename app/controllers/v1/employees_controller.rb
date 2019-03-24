class V1::EmployeesController < ApplicationController
    def index
        @employees = Employee.where(library_id: params[:library_id]).order(:id)
        render json: @employees, status: :ok
    end

    def create
        @employee = Employee.new(employee_params)
        @employee.save
        render json: @employee, status: :created
    end

    def update
        @employee = Employee.find(params[:id])
        @employee.update_attributes(employee_params)
        render json: @employee, status: :ok
    end

    private

    def employee_params
        params.require(:employee).permit(:library_id, :surname, :name, :patronymic, :birthday, :employ_date, :position, :education)
    end
end
