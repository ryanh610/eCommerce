const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({include: [Product]})
  .then((data) => res.json(data))
  .catch((err) => console.error('Error: ', err));
});

router.get('/:id', (req, res) => {
  Category.findOne({where: {id: req.params.id}, include: {model: Product, attributes:['category_id']}})
  .then((data) => res.json(data))
  .catch((err) => console.error('Error: ', err));
});

router.post('/', (req, res) => {
  Category.create({category_name: req.body.category_name})
  .then((data) => res.json(data))
  .catch((err) => console.error('Error: ', err));
});

router.put('/:id', (req, res) => {
  Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}})
  .then(data => {
    if (!data) {
      res.status(404).json({message: 'invalid category.'});
      return;
    } else {
      res.json(data)
    }
  })
  .catch((err) => console.error('Error: ', err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({where: {id: req.params.id}})
  .then(data => {
    if (!data) {
      res.status(404).json({message: 'invalid category.'});
      return;
    } else {
      res.json(data)
    }
  })
});

module.exports = router;
