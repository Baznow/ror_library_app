class CreateBookPasses < ActiveRecord::Migration[5.2]
  def change
    create_table :book_passes, id: false do |t|
      t.column :id, 'serial', primary_key: true
      t.column :book_id, 'integer', null: false
      t.column :subscriber_id, 'integer', null: false
      t.column :pass_date, 'date', null: false
      t.column :return_date, 'date', null: false
    end
    add_foreign_key :book_passes, :books, column: :book_id
    add_foreign_key :book_passes, :subscribers, column: :subscriber_id
  end
end
