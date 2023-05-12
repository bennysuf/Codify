class CreateContactForms < ActiveRecord::Migration[7.0]
  def change
    create_table :contact_forms do |t|
      t.belongs_to :developer, null: false, foreign_key: true
      t.string :email
      t.string :name
      t.string :head
      t.text :body

      t.timestamps
    end
  end
end
