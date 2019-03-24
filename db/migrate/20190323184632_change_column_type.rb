class ChangeColumnType < ActiveRecord::Migration[5.2]
    def change
        change_column :subscribers, :address, :string, limit: 1000
    end
end
