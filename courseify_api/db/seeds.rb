# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
videos = Video.create([
    {
        title: "Video 1",
        description: "content",
        url: "https://google.com"
    },
    {
        title: "Video 2",
        description: "more content",
        url: "https://google.com"
    },
    {
        title: "Video 3",
        description: "more more content",
        url: "https://google.com"
    }
])