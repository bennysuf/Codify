class DevelopersController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :create, :update, :destroy]

    def create
        dev = Developer.create(
            username: params[:username],
            password: params[:password],
            password_confirmation: params[:password_confirmation],
            email: params[:email],
            public_profile: false
            # dev_params
            #? how to have strong params + public_profile? 
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
        render json: Developer.all, status: :ok
        # render json: Developer.where(public_profile: true), status: :ok
    end

    def update
        dev = find_dev
        dev.tap do |u|
            if params[:username] == ""
                render json: {error: "Please add username"}, status: :unprocessable_entity
            elsif dev.username == params[:username]
                # ? how can i combine this with no other error? 
                u.public_profile = params[:public_profile]
                u.save(validate: false)
                render json: dev, status: :accepted
            elsif Developer.find_by(username: params[:username]) != nil
                render json: {error: "Username already exists"}, status: :unprocessable_entity
            else 
                u.username = params[:username]
                u.public_profile = params[:public_profile]
                u.save(validate: false)
                render json: dev, status: :accepted
            end
        end
    end

    def destroy
        dev = Developer.find(params[:id])
        dev.destroy
        render json: {}, status: :ok
    end

    private 

    def dev_params
        params.require(:developer).permit(:username, :password, :password_confirmation, :email, :public_profile)
    end
    
end
