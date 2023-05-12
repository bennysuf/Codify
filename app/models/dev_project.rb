class DevProject < ApplicationRecord
  belongs_to :developer
  belongs_to :project
end
