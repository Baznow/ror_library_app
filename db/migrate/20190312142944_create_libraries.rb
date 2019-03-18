class CreateLibraries < ActiveRecord::Migration[5.2]
  def change
    create_table :libraries, id: false do |t|
      t.column :id, 'serial', primary_key: true
      t.column :number, 'varchar(100)', null: false
      t.column :name, 'varchar(1000)', null: false
      t.column :address, 'varchar(500)', null: false
    end
  end
end
