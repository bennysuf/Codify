class Project < ApplicationRecord
    has_many :dev_projects
    has_many :developers, through: :dev_projects

    # validations
end
