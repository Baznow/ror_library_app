class ChangeColumnName < ActiveRecord::Migration[5.2]
    def change
        rename_column :books, :name, :title
    end
end
