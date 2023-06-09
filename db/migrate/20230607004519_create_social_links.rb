class CreateSocialLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :social_links do |t|
      t.string :twitter, :default => ""
      t.string :facebook, :default => ""
      t.string :linkedin, :default => ""
      t.string :instagram, :default => ""
      t.string :github, :default => ""
      t.string :youtube, :default => ""
      t.string :blog, :default => ""
      t.belongs_to :developer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
