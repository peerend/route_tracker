class CreateUserRoutes < ActiveRecord::Migration[5.1]
  def create_table
    create_table :user_routes do |t|
      t.string :route_name
      t.float :route_end_lat
      t.float :route_end_lon
      t.string :dest_name
      t.string :dest_url
      t.string :dest_desc

      t.timestamps
    end
  end
end
