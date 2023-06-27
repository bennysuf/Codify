class CollaborationSerializer < ActiveModel::Serializer
  attributes :id, :project_id, :dev_username

  # belongs_to :developer
  # belongs_to :project

  def dev_username
    object.developer.username
  end
end
