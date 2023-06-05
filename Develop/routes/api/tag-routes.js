const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tag = await Tag.findAll({
      include: [{model: Product}, {model: ProductTag}],
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}, {model: ProductTag}],
    });
    if (!cat) {
      res.status(404).json({message: 'Tag not found.'});
      return;
    }
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    category_id: req.params.Tag_id
  })
    .then((updatedTag) => {
      res.json(updatedTag)
    })
    .catch((err) => res.json(err))
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      Tag_id: req.params.Tag_id,
    },
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err))
  // delete on tag by its `id` value
});

module.exports = router;
