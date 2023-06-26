class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :description, :linkText

  has_many :developers
  has_many :collaborations

end
