const express = require('express')
const routes = express.Router()
const Category =  require('../models/Category')
const Articles = require('../models/Articles')
const slugify = require('slugify')

routes.get('/admin/articles', (req, res) => {
    Articles.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render('admin/articles/index', { articles: articles })
    })
})

routes.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories})
    })
})

routes.post('/articles/save', (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category

    Articles.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles')
    })

})

routes.post('/articles/delete', (req, res) => {
    const id = req.body.id;

    if(id != undefined) {
        if(!isNaN(id)) {
            Articles.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles')
            })
        }else {
            res.redirect('/admin/articles')
        }
        }else {
            res.redirect('/admin/articles')
    } 
})

routes.get('/admin/articles/edit/:id', (req, res) => {
    const id = req.params.id

    Articles.findByPk(id).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                return res.render('admin/articles/edit', { categories })
            })
        } else {    
            return res.redirect('/')
        }
    }).catch(erro => {
        return res.redirect('/')
    })
})

module.exports = routes