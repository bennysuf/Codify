class Developer < ApplicationRecord
    has_many :dev_projects
    has_many :projects, through: :dev_projects
    has_many :contact_forms
    has_one :social_link

    has_secure_password

    validates :password, presence: true
    validates :password_confirmation, presence: true
    validates :username, presence: true, uniqueness: true
    validates_format_of :resume, :with => /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i, allow_blank: true
    # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true #! test 
    # validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP
    # validates :email, email: {mode: :strict, require_fqdn: true}
    # validates :email, presence: true, email: true
    # TODO: validate email

end