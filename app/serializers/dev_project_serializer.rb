class DevProjectSerializer < ActiveModel::Serializer
  attributes :id
  has_one :developer
  has_one :project
end
