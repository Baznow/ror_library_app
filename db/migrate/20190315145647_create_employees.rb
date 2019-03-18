class CreateEmployees < ActiveRecord::Migration[5.2]
  def change
    create_table :employees, id: false do |t|
      t.column :id, 'serial', primary_key: true
      t.column :library_id, 'integer', null: false
      t.column :surname, 'varchar(100)', null: false
      t.column :name, 'varchar(100)', null: false
      t.column :patronymic, 'varchar(100)', null: false
      t.column :birthday, 'date', null: false
      t.column :employ_date, 'date', null: false
      t.column :position, 'varchar(256)', null: false
      t.column :education, 'varchar(100)', null: false
    end
    add_foreign_key :employees, :libraries, column: :library_id
  end
end
