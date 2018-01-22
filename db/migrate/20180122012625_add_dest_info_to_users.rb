class AddDestInfoToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :dest_lat, :float
    add_column :users, :dest_lon, :float
    add_column :users, :dest_type, :string
    add_column :users, :dest_desc, :string
  end
end
