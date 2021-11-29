var express = require('express');
var router = express.Router();
var asyncHandler = require('../middleware/async');

const ItemsModel = require (__path_models + 'items');

/* GET users listing. */
router.get('/', asyncHandler( async (req, res) => {
      let params= [];
      params.keyword = req.query.keyword;
      params.sortField = req.query.orderBy;
      params.sortType = req.query.orderDir;
      const data = await ItemsModel.listItems(params, {'task' : 'all'});
      res.status(201).json({
      success: true,
      data: data
      })
}));

router.get('/:id',asyncHandler( async (req, res) => {
  const data = await ItemsModel.listItems(req.params.id, {'task' : 'one'});
  res.status(201).json({
    success: true,
    data: data
  })
}));

router.put('/edit/:id', asyncHandler( async (req, res) => {

  let body = req.body;

  const data = await ItemsModel.editItems({'id': req.params.id, 'body':body}, {'task' : 'edit'});
  res.status(201).json({
    success: true,
    data: data
  })
}));

router.post('/add', asyncHandler( async (req, res) => {
  let params = {
    id : makeId(8),
    name : req.body.name,
    status : req.body.status,
  };
  
  let para = [];
  para.name = req.body.name;
  para.status = req.body.status;

  const data = await ItemsModel.create(para);
  
  res.status(201).json({
    success: true,
    data: data
  });
}));

router.delete('/delete/:id', asyncHandler( async (req, res) => {
      let param = {
        id : req.params.id
      }
      try {
      const data = await ItemsModel.deleteItems( param, {'task' : 'one'});
      res.status(201).json({
      success: true,
      })
      } catch {
        res.status(400).json({success: false})
      }
 
}));

module.exports = router;
