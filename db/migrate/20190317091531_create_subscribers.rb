class CreateSubscribers < ActiveRecord::Migration[5.2]
  def change
    create_table :subscribers, id: false do |t|
      t.column :id, 'serial', primary_key: true
      t.column :library_id, 'integer', null: false
      t.column :card_num, 'numeric(38)', null: false
      t.column :surname, 'varchar(100)', null: false
      t.column :name, 'varchar(100)', null: false
      t.column :patronymic, 'varchar(100)', null: false
      t.column :address, 'numeric(1000)', null: false
      t.column :phone, 'numeric(38)', null: false
    end
    add_foreign_key :subscribers, :libraries, column: :library_id
  end
end
