class CreateRecommendations < ActiveRecord::Migration[5.2]
  def change
    create_table :recommendations do |t|
      t.string :title
      t.string :url
      t.text :description
      t.references :user, foreign_key: true
      t.string :author

      t.timestamps
    end
  end
end
