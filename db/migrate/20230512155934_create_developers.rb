class CreateDevelopers < ActiveRecord::Migration[7.0]
  def change
    create_table :developers do |t|
      t.string :username
      t.string :password_digest
      t.boolean :public_profile
      t.string :email

      t.timestamps
    end
  end
end
