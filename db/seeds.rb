# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "Planting seeds"
Developer.create(username: "benny", password: "benny", password_confirmation: "benny", email: "benny@gmail.com", public_profile: true)
Developer.create(username: "test", password: "test", password_confirmation: "test", email: "test@aol.com", public_profile: true)
# Developer.create(username: "", password: "", password_confirmation: "", email: "")
# Developer.create(username: "", password: "", password_confirmation: "", email: "")

puts "Seeds planted"