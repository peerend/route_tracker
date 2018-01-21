require 'test_helper'

class UserRoutesControllerTest < ActionDispatch::IntegrationTest
  test "should get route_name:string" do
    get user_routes_route_name:string_url
    assert_response :success
  end

  test "should get route_end_lat:float" do
    get user_routes_route_end_lat:float_url
    assert_response :success
  end

  test "should get route_end_lon:float" do
    get user_routes_route_end_lon:float_url
    assert_response :success
  end

  test "should get dest_name:string" do
    get user_routes_dest_name:string_url
    assert_response :success
  end

  test "should get dest_url:string" do
    get user_routes_dest_url:string_url
    assert_response :success
  end

  test "should get dest_desc:string" do
    get user_routes_dest_desc:string_url
    assert_response :success
  end

end
