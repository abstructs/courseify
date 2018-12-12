class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      # Auth
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      # Tracking
      t.integer  :sign_in_count, default: 0, null: false

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
  