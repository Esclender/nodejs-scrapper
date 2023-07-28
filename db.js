require('dotenv').config()
const { MongoClient } = require('mongodb')

class Db {
  client = new MongoClient(process.env.DB_URI)
  database = this.client.db('scrapping')
  connection = this.database.collection('FliesPackages')

  async close () {
    await this.client.close()
  }

  async inserter (data) {
    const result = await this.connection.insertMany(data)
    return {
      message: `${result.insertedCount} documents were inserted`
    }
  }
}

module.exports = Db
