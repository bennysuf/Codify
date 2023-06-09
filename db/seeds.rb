
puts "Planting seeds"
Developer.create(username: "benny", password: "benny", password_confirmation: "benny", email: "benny@gmail.com", public_profile: true)
Developer.create(username: "test", password: "test", password_confirmation: "test", email: "test@aol.com", public_profile: true)
Developer.create(username: "dad", password: "dad", password_confirmation: "dad", email: "dad@aol.com", public_profile: false)

SocialLink.create(developer_id: 1)
SocialLink.create(developer_id: 2)
SocialLink.create(developer_id: 3)


puts "Seeds planted"