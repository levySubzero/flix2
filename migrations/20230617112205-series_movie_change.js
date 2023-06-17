module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('Series').updateMany({}, {$set: {subGenres: 'Action, Comedy, Drama',
    trailerUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4Action',
    cast: 'Tom Cruise, Ben Affleck',
    shortDesc: 'Violent, Thrilling, Romantic'}});
    await db.collection('Movie').updateMany({}, {$set: {subGenres: 'Action, Comedy, Drama',
    trailerUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4Action',
    cast: 'Tom Cruise, Ben Affleck',
    shortDesc: 'funny, Thriller, Romantic'}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection('Series').updateMany({}, {$set: {subGenres: 'Action, Comedy, Drama',
    trailerUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4Action',
    cast: 'Tom Cruise, Ben Affleck',
    shortDesc: 'Violent, Thrilling, Romantic'}});
    await db.collection('Movie').updateMany({}, {$set: {subGenres: 'Action, Comedy, Drama',
    trailerUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4Action',
    cast: 'Tom Cruise, Ben Affleck',
    shortDesc: 'funny, Thriller, Romantic'}});
  }
};
 