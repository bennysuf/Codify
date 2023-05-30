# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_12_160246) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contact_forms", force: :cascade do |t|
    t.bigint "developer_id", null: false
    t.string "email"
    t.string "name"
    t.string "head"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["developer_id"], name: "index_contact_forms_on_developer_id"
  end

  create_table "dev_projects", force: :cascade do |t|
    t.bigint "developer_id", null: false
    t.bigint "project_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["developer_id"], name: "index_dev_projects_on_developer_id"
    t.index ["project_id"], name: "index_dev_projects_on_project_id"
  end

  create_table "developers", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.boolean "public_profile", default: false
    t.text "about", default: ""
    t.text "social_links", default: ""
    t.string "resume", default: ""
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "title"
    t.string "url"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "contact_forms", "developers"
  add_foreign_key "dev_projects", "developers"
  add_foreign_key "dev_projects", "projects"
end
