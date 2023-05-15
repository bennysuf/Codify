class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :description

  has_many :developers

end
