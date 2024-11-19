/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ph4jea3ysfn6gju")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ajpyd9xn",
    "name": "batch",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ph4jea3ysfn6gju")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ajpyd9xn",
    "name": "batch",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
})
