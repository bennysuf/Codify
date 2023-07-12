class Developer < ApplicationRecord
    has_many :dev_projects
    has_many :projects, through: :dev_projects, dependent: :destroy
    has_many :collaborations
    has_one :social_link, dependent: :destroy

    has_secure_password

    after_create :send_welcome_email

    validates :password, presence: true
    validates :password_confirmation, presence: true
    validates :username, presence: true, uniqueness: true
    validates_format_of :resume, :with => /\A(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?\Z/i, allow_blank: true
    validates :email, format: {with:  /\A(.+)@(.+)\z/, message: "not valid"}, presence: true, uniqueness: true

    def send_welcome_email
        DeveloperMailer.welcome(self).deliver_now  
    end

end