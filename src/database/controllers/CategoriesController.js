const express = require('express')
const routes = express.Router()
const Category = require('../models/Category')
const slugify = require('slugify')


routes.get('/admin/categories/new', (req, res) => {
    return res.render('admin/categories/new')
})

routes.post('/categories/save', (req, res) => {
    var title =  req.body.title

    if(title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/admin/categories')
        })
    } else {
        res.redirect('/admin/categories/new')
    }
})

routes.get('/admin/categories', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories/index', { categories: categories})
    })
})

routes.post('/categories/delete', (req, res) => {
    const id = req.body.id;

    if(id != undefined) {
        if(!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories')
            })
        }else {
            res.redirect('/admin/categories')
        }
        }else {
            res.redirect('/admin/categories')
    } 
})


routes.get('/admin/categories/edit/:id', (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        res.redirect('admin/categories')
    }

    Category.findByPk(id).then(category => {
        if(category != undefined) {
            res.render('admin/categories/edit', {category: category})
        } else {
            res.redirect('/admin/categories')
        }
    }).catch(erro => {
        res.redirect('/admin/categories')
    })
})

routes.post('/categories/update', (req, res) => {
    const id =  req.body.id;
    const title = req.body.title

    Category.update({ title: title, slug: slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/categories')
    })

}) 

module.exports = routes