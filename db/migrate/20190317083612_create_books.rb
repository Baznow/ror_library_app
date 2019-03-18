class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books, id: false do |t|
      t.column :id, 'serial', primary_key: true
      t.column :library_id, 'integer', null: false
      t.column :name, 'varchar(2000)', null: false
      t.column :author, 'varchar(1000)', null: false
      t.column :mark, 'varchar(100)', null: false
      t.column :publisher, 'varchar(256)', null: false
      t.column :pub_date, 'numeric(38)', null: false
      t.column :price, 'numeric(10,2)', null: false
      t.column :ar_date, 'date', null: false
    end
    add_foreign_key :books, :libraries, column: :library_id
  end
end
