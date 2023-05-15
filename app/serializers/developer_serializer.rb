class DeveloperSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :public_profile, :email, :about_me, :social_links, :resume

  has_many :projects
end
