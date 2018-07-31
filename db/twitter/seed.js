const db = require('./index.js');
const faker = require('faker');
const mongoose = require('mongoose');

const sampleData = () => {
  const sampleArray = [];
  for (let i = 0; i < 20; i += 1) {
    sampleArray.push(
      {
        created_at: faker.date.past(),
        sentiment: faker.lorem.sentence(),
        tweet_id: i + 1,
        text: faker.lorem.sentence(),
        timestamp: faker.random.number(),
        name: faker.lorem.sentence(),
        username: faker.lorem.sentence(),
        location: faker.lorem.sentence(),
        timezone: faker.lorem.sentence(),
        profile_image_url: faker.lorem.sentence(),
      },
    );
  }
  return sampleArray;
};

const sampleArrays = sampleData();
const insertSampleData = () => {
  db.Tweets.create(sampleArrays);
};

insertSampleData();
