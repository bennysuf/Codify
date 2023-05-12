class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :description
end
