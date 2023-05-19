class Profile < ApplicationRecord
  belongs_to :developer

  validates_format_of :resume, :with => /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i
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
