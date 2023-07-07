class DeveloperSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :public_profile, :email, :resume, :about, :projects_collabs, :ordered_projects

  has_one :social_link

  def ordered_projects
    object.projects.order("created_at DESC")
  end 

  def projects_collabs
    collab = []
  
    projects = object.projects.each do |project| 
     project.id
    end

    projects.each do |project|
     collabs = Collaboration.where("project_id = ?", project)
     collab << collabs.filter {|c| c.developer_id != object.id}
    end

    collab.filter {|c| c != []}
  end

end
