class DeveloperSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :public_profile, :email, :resume, :about

  has_one :social_link
  has_many :projects
end
