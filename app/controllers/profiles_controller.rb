class ProfilesController < ApplicationController
    skip_before_action :authorize, only: [:show, :create, :update, :index]
    def show 
        dev = find_dev
        profile = dev.profile
        render json: profile, status: :ok
    end

    def create
        dev = find_dev
        Profile.create!(
            developer_id: dev.id,
            about: params[:about],
            resume: params[:resume],
            social_links: params[:social_links]
        )
        render json: dev, status: :created
    end
    
    def update
        dev = find_dev
        dev.profile.update!(profile_params)
        render json: dev, status: :accepted
    end

    def index 
        render json: Profile.all, status: :ok
    end

    private

    def profile_params
        params.require(:profile).permit(:about, :social_links, :resume)
    end
end
