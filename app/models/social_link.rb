class SocialLink < ApplicationRecord
    belongs_to :developer

    url = /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i
    error = "Invalid url"

    validates :blog, format: { with: url, allow_blank: true, message: error}
    validates :github, format: { with: url, allow_blank: true, message: error}
    validates :youtube, format: { with: url, allow_blank: true, message: error}
    validates :twitter, format: { with: url, allow_blank: true, message: error}
    validates :linkedin, format: { with: url, allow_blank: true, message: error}
    validates :facebook, format: { with: url, allow_blank: true, message: error}
    validates :instagram, format: { with: url, allow_blank: true, message: error}
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
