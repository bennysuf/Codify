class ProjectsController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show, :update, :destroy]
    
    def create
        dev = find_dev
        project = dev.projects.create!(project_params)
        render json: project, status: :created
    end

    def update
        project = Project.find_by_id(params[:id]) 
        project.update!(project_params)
        render json: project, status: :accepted 
    end

    def show
        dev = find_dev
        projects = dev.projects.all.order("created_at DESC")
        render json: projects, status: :ok
    end

    def index
       render json: Project.all
    end

    def destroy
        projects = Project.find_by(id: params[:id])
        projects.destroy
        render json: {}
    end

    private

    def project_params
        params.require(:project).permit(:title, :url, :description, :linkText)
    end

end
