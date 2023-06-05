const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const cat = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const cat = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!cat) {
      res.status(404).json({message: 'Catagory not found.'});
      return;
    }
    res.status(200).json(cat)
  } catch (err) {
    res.status(500).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    category_id: req.params.category_id
  })
    .then((updatedCategory) => {
      res.json(updatedCategory)
    })
    .catch((err) => res.json(err))
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => res.json(err))
  // delete a category by its `id` value
});

module.exports = router;
