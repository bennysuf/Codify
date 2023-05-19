class Developer < ApplicationRecord
    has_many :dev_projects
    has_many :projects, through: :dev_projects
    has_many :contact_forms
    has_one :profile
    has_secure_password

    validates :password, presence: true
    validates :password_confirmation, presence: true
    validates :username, presence: true, uniqueness: true
    # validates_format_of :social_links, :with => /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i
    # * to validate, maybe add row for each link? or custom validation to map through array?
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true #! test 
end
