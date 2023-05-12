class Developer < ApplicationRecord
    has_many :dev_projects
    has_many :projects, through: :dev_projects
    has_many :contact_forms
    has_secure_password

    # validations
end
