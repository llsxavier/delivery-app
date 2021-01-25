const connection = require('./connection');

const searchUserByEmail = async (email) => {
  const result = await connection()
    .then((db) =>
      db
        .getTable('users')
        .select([])
        .where('email = :email')
        .bind('email', email)
        .execute()
        .then((results) => results.fetchOne())
        .then((results) => {
          if (!results) return null;
          const [id, name, email, password, role] = results;
          return { id, name, email, password, role };
        })
    )
    .catch((err) => {
      console.err(err);
    });
  return result;
};

module.exports = {
  searchUserByEmail,
};
