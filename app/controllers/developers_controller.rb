class DevelopersController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :create, :update]

    def create
        dev = Developer.create(
            username: params[:username],
            password: params[:password],
            password_confirmation: params[:password_confirmation],
            email: params[:email],
            public_profile: false
            # dev_params
            )
        if dev.valid?
            session[:dev_id] = dev.id
            render json: dev, status: :created
        else
            render json: {errors: dev.errors.full_messages}, status: :unprocessable_entity
        end
    end
 
    def show
        dev = find_dev
        render json: dev, status: :ok
    end

    def index
        render json: Developer.all.where(public_profile: true), status: :ok
    end

    def update
        dev = find_dev
        dev.update!(dev_params)
        render json: dev, status: :accepted
    end

    private 

    def dev_params
        params.permit(:username, :password, :password_confirmation, :email, :public_profile)
    end
    
end
