# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_17_201715) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "book_passes", id: :serial, force: :cascade do |t|
    t.integer "book_id", null: false
    t.integer "subscriber_id", null: false
    t.date "pass_date", null: false
    t.date "return_date", null: false
  end

  create_table "books", id: :serial, force: :cascade do |t|
    t.integer "library_id", null: false
    t.string "title", limit: 2000, null: false
    t.string "author", limit: 1000, null: false
    t.string "mark", limit: 100, null: false
    t.string "publisher", limit: 256, null: false
    t.decimal "pub_date", precision: 38, null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.date "ar_date", null: false
  end

  create_table "employees", id: :serial, force: :cascade do |t|
    t.integer "library_id", null: false
    t.string "surname", limit: 100, null: false
    t.string "name", limit: 100, null: false
    t.string "patronymic", limit: 100, null: false
    t.date "birthday", null: false
    t.date "employ_date", null: false
    t.string "position", limit: 256, null: false
    t.string "education", limit: 100, null: false
  end

  create_table "libraries", id: :serial, force: :cascade do |t|
    t.string "number", limit: 100, null: false
    t.string "name", limit: 1000, null: false
    t.string "address", limit: 500, null: false
  end

  create_table "subscribers", id: :serial, force: :cascade do |t|
    t.integer "library_id", null: false
    t.decimal "card_num", precision: 38, null: false
    t.string "surname", limit: 100, null: false
    t.string "name", limit: 100, null: false
    t.string "patronymic", limit: 100, null: false
    t.decimal "address", precision: 1000, null: false
    t.decimal "phone", precision: 38, null: false
  end

  add_foreign_key "book_passes", "books"
  add_foreign_key "book_passes", "subscribers"
  add_foreign_key "books", "libraries"
  add_foreign_key "employees", "libraries"
  add_foreign_key "subscribers", "libraries"
end
