class DevelopersController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :create, :update, :destroy]

    def create
        byebug
        dev = Developer.create(dev_params)
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
        render json: Developer.all, status: :ok
        # render json: Developer.where(public_profile: true), status: :ok
    end

    def update
        dev = find_dev
        dev_finder = Developer.find_by(username: params[:username])
        dev.tap do |u|
            if params[:username] == ""
                render json: {error: "Please add username"}, status: :unprocessable_entity
            elsif dev_finder != nil && dev_finder.username != dev.username
                render json: {error: "Username already exists"}, status: :unprocessable_entity
            elsif url_validator(params[:resume])
                # byebug
                u.username = params[:username]
                u.public_profile = params[:public_profile]
                u.about = params[:about]
                u.resume = params[:resume]
                u.social_links = params[:social_links]
                u.save(validate: false)
                render json: dev, status: :accepted
            else 
                render json: {error: "Invalid data"}, status: :unprocessable_entity
            end
        end
    end

    def destroy
        dev = Developer.find(params[:id])
        dev.destroy
        render json: {}, status: :ok
    end

    private 

    def url_validator(param) 
        # byebug
        !!(param.match(/\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i))
    end

    def dev_params
        params.permit(:username, :password, :password_confirmation, :email, :public_profile, :about, :resume, :social_links)
    end
    
end
