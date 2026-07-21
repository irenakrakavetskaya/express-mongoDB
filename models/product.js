const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  // instance method is a method that is called on an instance of the class
  save() {
    // get access to the database
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection('products')
        // $set is a MongoDB operator that updates the document
        // $set operator adds new fields or updates the values
        // of existing fields in a document.
        // Instead of replacing the entire document,
        // it selectively modifies only the fields you specify,
        //  leaving unmentioned fields untouched
        // _id is the id of the document
        // this is the document that we want to update
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // static method is a method that is called on the class itself, not on an instance of the class
  // static methods are not associated with any particular instance of the class
  // we need to use static methods  because we don't need to create an instance of the class to use it
  static fetchAll() {
    const db = getDb();
    return (
      db
        .collection('products')
        .find()
        // toArray() is a method that converts the cursor to an array
        .toArray()
        .then((products) => {
          console.log(products);
          return products;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

  static findById(prodId) {
    const db = getDb();
    return (
      db
        .collection('products')
        // we need ObjectId because the id is not a string, it is an object
        .find({ _id: new mongodb.ObjectId(prodId) })
        // use next() because the find() method returns a cursor,
        // and we need to get the first document from the cursor
        .next()
        .then((product) => {
          console.log(product);
          return product;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log('Deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
