class DeveloperMailer < ApplicationMailer

  def welcome(dev)
    @dev = dev

    bootstrap_mail to: dev.email
  end
end
