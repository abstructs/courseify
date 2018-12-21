class RemoveUniqueFromRecommendations < ActiveRecord::Migration[5.2]
  def change
    remove_index :recommendations, [:course_id, :user_id]
    add_index :recommendations, [:course_id, :user_id]
  end
end
