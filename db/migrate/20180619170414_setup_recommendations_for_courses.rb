class SetupRecommendationsForCourses < ActiveRecord::Migration[5.2]
  def change
    add_reference :recommendations, :course, index: true

    remove_column :recommendations, :title, :string
    remove_column :recommendations, :author, :string
    remove_column :recommendations, :url, :string
    remove_column :recommendations, :description, :string

    add_index :recommendations, [:course_id, :user_id], unique: true
  end
end
