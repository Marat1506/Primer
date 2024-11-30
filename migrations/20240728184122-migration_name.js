module.exports = {
  async up(db, client) {
    const movies = await db.collection('movies').find({}).toArray();

    for(const movie of movies){
      await db.collection('movies').updateOne(
        {_id: movie._id},
        {$set: {description: movie.title}}
      );
    }
  },

  async down(db, client) {
    const movies = await db.collection('movies').find({}).toArray();

    for(const movie of movies){
      await db.collection('movies').updateOne(
        {_id: movie._id},
        {$unset: {description: movie.title}}
      );
    }
  }
};
