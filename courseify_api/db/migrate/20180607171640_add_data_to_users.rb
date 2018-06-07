class AddDataToUsers < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :headline
      t.string :education
      t.string :industry
      t.string :country
      t.text :summary
    end
  end
end
