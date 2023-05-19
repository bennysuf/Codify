class ProfilesController < ApplicationController
    skip_before_action :authorize, only: [:show, :create, :update, :index, :destroy]
    def show 
        dev = find_dev
        profile = dev.profile
        render json: profile, status: :ok
    end

    def create
        # dev = find_dev
        dev = Developer.first
        # byebug
        # profile = dev.profile.create(profile_params)
        profile = Profile.create(
            developer_id: dev.id,
            about: params[:about],
            resume: params[:resume],
        )
        render json: profile, status: :created
    end
    
    def update
        dev = find_dev
        profile = dev.profile.update!(profile_params)
        render json: profile, status: :accepted
    end

    def index 
        render json: Profile.all, status: :ok
    end

    def destroy
        dev = Developer.first
        # profile = Profile.first
        dev.profile.destroy
        # profile.profile.destroy
        render json: {}
    end

    private

    def profile_params
        params.permit(:about, :social_links, :resume)
    end
end
