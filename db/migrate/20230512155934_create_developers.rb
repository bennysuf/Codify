class CreateDevelopers < ActiveRecord::Migration[7.0]
  def change
    create_table :developers do |t|
      t.string :username
      t.string :password_digest
      t.boolean :public_profile, :default => false
      t.text :about, :default => ""
      t.text :social_links, :default => ""
      t.string :resume, :default => ""
      t.string :email

      t.timestamps
    end
  end
end
