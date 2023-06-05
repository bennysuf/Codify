class Project < ApplicationRecord
    has_many :dev_projects, dependent: :destroy
    has_many :developers, through: :dev_projects

    serialize :url, Hash

    validates :title, presence: true
    validates :description, presence: true
    # validates_format_of :url, :with => /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i
    # Valid ones:
    # 'www.crowdint.com'
    # 'crowdint.com'
    # 'http://crowdint.com'
    # 'http://www.crowdint.com'
   
    # Invalid ones:
    #  'http://www.crowdint. com'
    #  'http://fake'
    #  'http:fake'
end
