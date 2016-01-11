var assert = require('assert');
var async = require('async');
var _mongoose = require('../../');
var Schema = _mongoose.Schema;

describe('model docs', function() {
  var mongoose;

  before(function(done) {
    mongoose =
      _mongoose.createConnection('mongodb://localhost:27017/mongoose_test');

    done();
  });

  after(function(done) {
    mongoose.close(done);
  });

  /**
   * [Models](./api.html#model-js) are fancy constructors compiled from our
   * `Schema` definitions. Instances of these models represent
   * [documents](./documents.html) which can be saved and retrieved from our
   * database. All document creation and retrieval from the database is handled
   * by these models.
   *
   * The first argument to `mongoose.model` is the _name_ of the model, and the
   * second argument is the schema. By default, mongoose will use the
   * pluralized form of the model name as the name of the MongoDB collection.
   * In the below example, `Tank` documents will be stored in the MongoDB
   * collection named 'tanks'.
   *
   * Note: The `.model()` function makes a copy of your schema. Make sure that
   * you've added everything you want to schema before calling `.model()`!
   */
  it('Compiling your first model', function() {
    var schema = new Schema({ name: String, size: String });
    var Tank = mongoose.model('Tank', schema);
    mongoose.model('Tank'); // Same as the `Tank` variable
    // acquit:ignore:start
    assert.strictEqual(Tank, mongoose.model('Tank'));
    //acquit:ignore:end
  });

  /**
   * [Documents](./documents.html) are instances of our model. Here's how
   * you create a document and save it to the database.
   *
   * Note that no tanks will be created/removed until the
   * [connection](http://mongoosejs.com/docs/connections.html) your model uses
   * is open. In this case we are using mongoose.model() so let's open the
   * default mongoose connection:
   *
   * ```javascript
   * mongoose.connect('mongodb://localhost:27017/test');
   * ```
   */

  it('Constructing documents', function(done) {
    // acquit:ignore:start
    var Tank = mongoose.model('Tank');
    var outstanding = 2;
    var handleError = done;
    //acquit:ignore:end
    var small = new Tank({ size: 'small' });
    small.save(function (err) {
      if (err) {
        return handleError(err);
      }
      // saved!
      // acquit:ignore:start
      --outstanding || done();
      // acquit:ignore:end
    });

    // or

    Tank.create({ size: 'small' }, function (err, small) {
      if (err) {
        return handleError(err);
      }
      // saved!
      // acquit:ignore:start
      --outstanding || done();
      // acquit:ignore:end
    });
  });

  /**
   * Finding documents is easy with Mongoose, which supports
   * [MongoDB's rich query syntax](https://docs.mongodb.org/manual/tutorial/query-documents/).
   * Documents can be retrieved using the model's
   * [find](http://mongoosejs.com/docs/api.html#model_Model.find),
   * [findById](http://mongoosejs.com/docs/api.html#model_Model.findById),
   * [findOne](http://mongoosejs.com/docs/api.html#model_Model.findOne),
   * or [where](http://mongoosejs.com/docs/api.html#model_Model.where) static methods.
   *
   * Check out the [querying guide](http://mongoosejs.com/docs/queries.html)
   * for more information.
   */

  it('Querying', function(done) {
    // acquit:ignore:start
    var Tank = mongoose.model('Tank');
    var callback = function(error, res) {
      if (error) {
        return done(error);
      }
      done();
    };
    var oneYearAgo = 0;
    //acquit:ignore:end
    Tank.find({ size: 'small' }).
      where('createdDate').gt(oneYearAgo).exec(callback);
  });

  /**
   * Models have a static `remove()` method available for removing all documents
   * that match the given conditions.
   */

  it('Removing', function(done) {
    // acquit:ignore:start
    var Tank = mongoose.model('Tank');
    var handleError = done;
    var oneYearAgo = 0;
    //acquit:ignore:end
    Tank.remove({ size: 'large' }, function(error) {
      if (error) {
        return handleError(error);
      }
      // removed!
      // acquit:ignore:start
      done();
      // acquit:ignore:end
    });
  });

  /**
   * ## Yet more
   * The API docs cover many additional methods available like
   * [count](http://mongoosejs.com/docs/api.html#model_Model.count),
   * [aggregate](http://mongoosejs.com/docs/api.html#model_Model.aggregate),
   * and more.
   *
   * ## Next Up
   *
   * Now that we've covered Models, let's take a look at
   [Documents](http://mongoosejs.com/docs/documents.html).
   */

  it('', function() {});
});
