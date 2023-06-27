class DevelopersController < ApplicationController
    skip_before_action :authorize, only: [:index, :create, :update, :destroy]

    def create
        dev = Developer.create(dev_params)
        SocialLink.create(developer_id: dev.id)
        if dev.valid?
            session[:dev_id] = dev.id
            render json: dev, status: :created
        else
            render json: {errors: dev.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def index
        render json: Developer.where(public_profile: true), status: :ok
    end

    def update
        dev = find_dev
        links = params[:social_links]
        dev_finder = Developer.find_by(username: params[:username])
        dev.social_link.update!(
            # TODO: add method that removes "https://" or "http://" or "www." with gsub("https")
            blog: links[:blog],
            github: links[:github],
            twitter: links[:twitter],
            youtube: links[:youtube],
            facebook: links[:facebook],
            linkedin: links[:linkedin],
            instagram: links[:instagram],
            )
        dev.tap do |u|
            if params[:username] == ""
                render json: {error: "Please add username"}, status: :unprocessable_entity
            elsif dev_finder != nil && dev_finder.username != dev.username
                render json: {error: "Username already exists"}, status: :unprocessable_entity
            elsif params[:resume] == "" || url_validator(params[:resume])
                u.username = params[:username]
                u.public_profile = params[:public_profile]
                u.about = params[:about]
                u.resume = params[:resume]
                u.save(validate: false)
                render json: dev, status: :accepted
            else 
                render json: {error: "Invalid data"}, status: :unprocessable_entity
            end
        end
    end

    def destroy
        dev = find_dev
        dev.destroy
        render json: {}, status: :ok
    end

    private 

    def url_validator(param) 
        !!(param.match(/\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i))
    end

    def dev_params
        params.permit(:username, :password, :password_confirmation, :email, :public_profile, :about, :resume, :social_links)
    end
end

# t.split(", ")[0].gsub("\"","").gsub("{:","").gsub("}","").gsub(":","").split("=>")