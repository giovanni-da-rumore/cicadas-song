require 'test_helper'

class ApiControllerTest < ActionController::TestCase
  test "should get users" do
    get :users
    assert_response :success
  end

end
