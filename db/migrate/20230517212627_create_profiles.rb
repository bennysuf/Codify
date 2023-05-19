class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.text :about
      t.text :social_links
      t.string :resume
      t.belongs_to :developer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
