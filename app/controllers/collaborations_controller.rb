class CollaborationsController < ApplicationController
    skip_before_action :authorize, only: [:create, :destroy]

    def create
        dev = Developer.where("username = params[:dev]")
        byebug
        collab = Collaboration.create(
            project_id: params[:project_id],
            dev_id: dev.id,
        )
        render json: collab, status: :created
    end

    def destroy
        collab = Collaboration.find(params[:id])
        collab.destroy
        render json: {}
    end
end
