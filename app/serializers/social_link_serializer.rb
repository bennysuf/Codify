class SocialLinkSerializer < ActiveModel::Serializer
  attributes :twitter, :facebook, :linkedin, :instagram, :youtube, :blog, :github

  belongs_to :developer
end
