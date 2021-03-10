const Sequelize = require('sequelize')
const connection = require('../index')
const Category = require('./Category')

const Articles = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
})


Category.hasMany(Articles) // uma categoria tem muitos artigos
Articles.belongsTo(Category) // um artigo pertence a uma categoria

//Articles.sync({foce: true})

module.exports = Articles;