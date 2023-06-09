class SocialLink < ApplicationRecord
    belongs_to :developer

    validates :blog, format: { with: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i, allow_blank: true, message: "invalid url " }
    validates :github, format: { with: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i, allow_blank: true, message: "invalid url " }
    validates :youtube, format: { with: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i, allow_blank: true, message: "invalid url " }
    validates :twitter, format: { with: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i, allow_blank: true, message: "invalid url " }
    validates :linkedin, format: { with: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i, allow_blank: true, message: "invalid url " }
    validates :facebook, format: { with: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i, allow_blank: true, message: "invalid url " }
    validates :instagram, format: { with: /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i, allow_blank: true, message: "invalid url " }
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
