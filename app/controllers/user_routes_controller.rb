class UserRoutesController < ApplicationController
  before_action :set_user_route, only: [:show, :edit, :update, :destroy]

  def index
    @user_routes = UserRoute.all
  end

  def show
  end

  def new
    @user_route = UserRoute.new
  end

  def edit
  end

  def create
    @user_route = UserRoute.new(user_route_params)

    respond_to do |format|
      if @user_route.save
        format.html { redirect_to @user_route, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user_route }
      else
        format.html { render :new }
        format.json { render json: @user_route.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @user_route.update(user_route_params)
        format.html { redirect_to @user_route, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user_route }
      else
        format.html { render :edit }
        format.json { render json: @user_route.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user_route.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_user
      @user_route = UserRoute.find(params[:id])
    end

    def user_route_params
      params.require(:user).permit(:route_end_lat, :route_end_lon, :dest_name, :dest_url, dest_desc)
    end
end
