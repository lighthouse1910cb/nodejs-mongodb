const Dev = require('../models/devModel');

const dev_index = (req, res, next) => {
  Dev.find()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch(next);
};

const dev_details = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Dev.findById(id)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch(next);
};

const dev_update = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  Dev.findByIdAndUpdate(id, req.body)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch(next);
}

const dev_create = (req, res, next) => {
  const user = new Dev(req.body);
  user.save()
    .then((result) => {
      res.send(result);
    })
    .catch(next);
};

const dev_delete = (req, res, next) => {
  const id = req.params.id;
  Dev.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch(next);
};

module.exports = {
  dev_index,
  dev_details,
  dev_create,
  dev_delete,
  dev_update
};
