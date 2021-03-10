const Sequelize = require('sequelize')
const connection = require('../index')

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      slug: {
        type: Sequelize.STRING,
        allowNull: false
      },
})

//Category.sync({foce: true})

module.exports = Category;