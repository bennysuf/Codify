class DevelopersController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :create]

    def create
        dev = Developer.create(dev_params)
        if dev.valid?
            session[:dev_id] = dev.id
            render json: dev, status: :created
        else
            render json: {errors: dev.errors.full_messages}, status: :unprocessable_entity
        end
    end
 
    def show
        # dev = find_dev
        dev = Developer.find_by(id: params[:id])
        render json: dev, status: :ok
    end

    def index
        render json: Developer.all, status: :ok
    end

    def update
        dev = find_dev
        dev.update!(dev_params)
        render json: dev, status: :updated
    end

    private 

    def dev_params
        params.permit(:username, :password, :password_confirmation, :email)
    end
    
end
