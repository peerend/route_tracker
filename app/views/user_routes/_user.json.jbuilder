json.extract! user_route, :id, :dest_name, :route_end_lat, :route_end_lon, :dest_desc, :created_at, :updated_at
json.url user_route_url(user_route, format: :json)
