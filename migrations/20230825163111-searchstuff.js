module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    const recordsToInsert = [
      { title: 'Test', type: 1, itemId: '64e3a15f57503725c3903c1d'},
      { title: 'Matrix', type: 1, itemId: '6491977e55d0344279e1d7ff'},
      { title: 'Sintel', type: 1, itemId: '6489655ab1217c39857b3689'},
      { title: 'Elephants Dream', type: 1, itemId: '64818af312899e2285455907'},
      { title: 'Tears of Steel', type: 1, itemId: '64818a4e12899e2285455906'},
      { title: 'Big Buck Bunny', type: 1, itemId: '6481875b12899e2285455904'},
      { title: 'Tech Heist', type: 2, itemId: '64b40af19d26bb50526f5b94'},
      { title: 'Tech Heist', type: 2, itemId: '64e0a32f5a930372929d30fe'},
    ];

    await db.collection('Search').insertMany(recordsToInsert);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    
  }
};
