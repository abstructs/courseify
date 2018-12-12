class AddCategoryToCourses < ActiveRecord::Migration[5.2]
  def change
    add_column :courses, :category, :integer
  end
end
