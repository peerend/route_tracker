class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :user_email
      t.float :home_lat
      t.float :home_lon

      t.timestamps
    end
  end
end
