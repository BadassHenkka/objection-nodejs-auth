const argon2 = require('argon2');
const randomBytes = require('crypto').randomBytes;

exports.seed = async function (knex) {
  // truncate all existing tables
  await knex.raw('TRUNCATE TABLE "users" CASCADE');

  const users = [
    {
      username: 'henri',
      password: '123456',
      email: 'henri@test.com',
    },
    {
      username: 'seppo',
      password: 'salasana',
      email: 'seppo@test.com',
    },
    {
      username: 'teppo',
      password: 'teppo',
    },
  ];

  const seedUsers = await Promise.all(
    users.map(async (user) => {
      const salt = randomBytes(32);
      const hash = await argon2.hash(user.password, { salt });
      const saltString = salt.toString('hex');

      return {
        username: user.username,
        password: hash,
        salt: saltString,
        email: user.email ? user.email : null,
      };
    })
  );

  await knex('users').insert(seedUsers);
};
