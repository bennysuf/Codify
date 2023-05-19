class DeveloperSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :public_profile, :email

  has_many :projects
  has_one :profile
end
