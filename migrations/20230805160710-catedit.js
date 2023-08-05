module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('Category').updateMany({}, {
      $push: {
        movieIds: { $each: ['64b40af19d26bb50526f5b94', '64bffc5e7ea2934832ee7515', '64b40f502ede68714847cf83', '6481875b12899e2285455904', '64818a4e12899e2285455906', '64818af312899e2285455907', '6489655ab1217c39857b3689', '6491977e55d0344279e1d7ff', '64bff5e87ea2934832ee750f'] },
      }
    });    
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('Category').updateMany({}, {
      $push: {
        movieIds: { $each: ['64b40af19d26bb50526f5b94', '64bffc5e7ea2934832ee7515', '64b40f502ede68714847cf83', '6481875b12899e2285455904', '64818a4e12899e2285455906', '64818af312899e2285455907', '6489655ab1217c39857b3689', '6491977e55d0344279e1d7ff', '64bff5e87ea2934832ee750f'] },
      }
    });
  }
};
