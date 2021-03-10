const express = require('express')
const app = express()
const connection = require('./database/index')
const categoriesController = require('./database/controllers/CategoriesController')
const articlesController = require('./database/controllers/ArticlesController')

const Articles = require('./database/models/Articles')
const Category = require('./database/models/Category')


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))
app.use(categoriesController)
app.use(articlesController)

app.get('/', (req, res) => {
    Articles.findAll({
        order: [
            ['id', 'DESC']
    ]
    }).then(articles => {

        Category.findAll().then(categories => {
            return res.render('index', { articles, categories })
        })
    })
})

app.get('/:slug', (req, res) => {
    const slug = req.params.slug;

    

    Articles.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                return res.render('article', { article, categories })
            })
        } else {
            return res.redirect('/')
        }
    }).catch(erro => {
        return res.redirect('/')
    })
})


connection.authenticate()
    .then(() => {
        console.log('Database ON')
    }).catch(() => {
        console.log('Database OFF')
    })

app.listen(3333, () => {
    console.log('Server On')
})