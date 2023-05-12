class ContactFormSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :head, :body
  has_one :developer
end
