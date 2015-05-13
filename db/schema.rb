# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150513162233) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annotations", force: :cascade do |t|
    t.integer  "text_id",                null: false
    t.integer  "author_id",              null: false
    t.text     "content",                null: false
    t.integer  "score",      default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "annotations", ["author_id"], name: "index_annotations_on_author_id", using: :btree
  add_index "annotations", ["score"], name: "index_annotations_on_score", using: :btree
  add_index "annotations", ["text_id"], name: "index_annotations_on_text_id", using: :btree

  create_table "authors", force: :cascade do |t|
    t.string   "name",       null: false
    t.date     "birth"
    t.date     "death"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "authors", ["birth"], name: "index_authors_on_birth", using: :btree
  add_index "authors", ["death"], name: "index_authors_on_death", using: :btree
  add_index "authors", ["name"], name: "index_authors_on_name", using: :btree

  create_table "libraries", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "text_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "libraries", ["text_id"], name: "index_libraries_on_text_id", using: :btree
  add_index "libraries", ["user_id"], name: "index_libraries_on_user_id", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "content",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "sessions", ["content"], name: "index_sessions_on_content", unique: true, using: :btree
  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "text_descriptions", force: :cascade do |t|
    t.integer  "text_id",                null: false
    t.integer  "author_id",              null: false
    t.string   "content"
    t.integer  "score",      default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "text_descriptions", ["author_id"], name: "index_text_descriptions_on_author_id", using: :btree
  add_index "text_descriptions", ["text_id"], name: "index_text_descriptions_on_text_id", using: :btree

  create_table "texts", force: :cascade do |t|
    t.string   "title",                          null: false
    t.string   "date"
    t.text     "body",                           null: false
    t.integer  "author_id",                      null: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.boolean  "author_is_user", default: false
  end

  add_index "texts", ["author_id"], name: "index_texts_on_author_id", using: :btree
  add_index "texts", ["date"], name: "index_texts_on_date", using: :btree
  add_index "texts", ["title"], name: "index_texts_on_title", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
