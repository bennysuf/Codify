class SessionController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
        #TODO: just have username or password, not either or 
        dev = Developer.find_by(username: params[:username])
        # if !dev
        #     render json: { error: "Username non existant" }, status: :unauthorized
        # elsif !dev&.authenticate(params[:password])
        #     render json: { error: "Invalid password" }, status: :unauthorized
        # elsif dev&.authenticate(params[:password]) 
        #     session[:dev_id] = dev.id
        #     render json: dev, status: :created
        # end
        if dev&.authenticate(params[:password])
            session[:dev_id] = dev.id
            render json: dev, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

    def destroy
        session.delete :dev_id
        head :no_content
    end
end
