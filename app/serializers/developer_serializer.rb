class DeveloperSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :public_profile, :email, :resume, :about, :ordered_projects

  has_one :social_link

  def ordered_projects
    object.projects.order("created_at DESC")
  end 

end
