require 'test_helper'

class MapHomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get map_home_index_url
    assert_response :success
  end

end
