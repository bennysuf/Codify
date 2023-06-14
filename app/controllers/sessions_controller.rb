class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create, :destroy]

    def create
        dev = Developer.find_by(username: params[:username])
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
