class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :about, :social_links, :resume
  has_one :developer
end
