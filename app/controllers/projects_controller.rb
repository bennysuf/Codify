class ProjectsController < ApplicationController
    skip_before_action :authorize, only: [:show, :show_project]

    # TODO: add collab create and destroy actions with custom routes? or in update and create? or have it in collab controller?
    # if in update then destroy collab has to be in update as well

    def create
        dev = find_dev
        project = dev.projects.create!(project_params)
        render json: project, status: :created
    end

    def update
        project = Project.find_by_id(params[:id]) 
        project.collaborations.delete_all
        project.update!(project_params)
        render json: project, status: :accepted 
    end

    def show
        dev = Developer.find_by_id(params[:id]) || find_dev
        projects = dev.projects.order("created_at DESC")
        looping = projects.each do |project|
            project.collaborations
        end
        render json: looping, status: :ok
    end

    def show_project
       render json: Project.find_by_id(params[:id]), status: :ok
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
