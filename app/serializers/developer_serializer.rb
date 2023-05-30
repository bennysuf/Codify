class DeveloperSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :public_profile, :email, :resume, :about, :social_links

  has_many :projects
end
