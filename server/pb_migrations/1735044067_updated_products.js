/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("ph4jea3ysfn6gju")

  // remove field
  collection.fields.removeById("buf8jbzi")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number3789599758",
    "max": 100,
    "min": 0,
    "name": "discount",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("ph4jea3ysfn6gju")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "buf8jbzi",
    "max": 99,
    "min": 0,
    "name": "discount",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number3789599758")

  return app.save(collection)
})
