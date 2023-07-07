class CollaborationsController < ApplicationController
    skip_before_action :authorize, only: [:create, :destroy, :index]

    def create
        dev = Developer.find_by(username: params[:dev])
        collab = Collaboration.create(
            project_id: params[:project_id],
            developer_id: dev.id,
        )
        render json: collab, status: :created
    end

    def index
        render json: Collaboration.all, status: :ok
    end

    def destroy
        collab = Collaboration.find(params[:id])
        collab.destroy
        render json: {}
    end
end
