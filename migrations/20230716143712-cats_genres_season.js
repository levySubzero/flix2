module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    const show = {
      title: "Tech Heist",
      description: "Find yourself in trouble when you know tech",
      genreId: "",
      thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png", 
      seasons: [],
      year: "2022",
      subGenres: "Tech, Sci-fi",
      trailerUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      cast: "Tom Cruise, Ryan Reynolds",
      shortDesc: "Romance, Racy",
      categoryId:  ""
    }
    const genreId = await db.collection('Genre').insertOne({ name: "action" });
    const categoryId = await db.collection('Category').insertOne({ name: "Trending Now" });
    const showId = await db.collection('Show').insertOne(show);
    await db.collection('Series').updateMany({}, {$set: {
      showId,
      title: 'Season 1'
    }});
    await db.collection('Movie').updateMany({}, {$set: {
      categoryId,
      genreId
    }});
    await db.collection('Show').updateMany({}, {$set: {
      categoryId,
      genreId
    }});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    const show = {
      title: "Tech Heist",
      description: "Find yourself in trouble when you know tech",
      genreId: "",
      thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png", 
      seasons: [],
      year: "2022",
      subGenres: "Tech, Sci-fi",
      trailerUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      cast: "Tom Cruise, Ryan Reynolds",
      shortDesc: "Romance, Racy",
      categoryId:  ""
    }
    const genreId = await db.collection('Genre').insertOne({ name: "action" });
    const categoryId = await db.collection('Category').insertOne({ name: "Trending Now" });
    const showId = await db.collection('Show').insertOne(show);
    await db.collection('Series').updateMany({}, {$set: {
      showId,
      title: 'Season 1'
    }});
    await db.collection('Movie').updateMany({}, {$set: {
      categoryId,
      genreId
    }});
    await db.collection('Show').updateMany({}, {$set: {
      categoryId,
      genreId
    }});
  }
}