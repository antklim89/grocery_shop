/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ph4jea3ysfn6gju")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pgfpkawk",
    "name": "images",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/webp"
      ],
      "thumbs": [],
      "maxSelect": 20,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ph4jea3ysfn6gju")

  // remove
  collection.schema.removeField("pgfpkawk")

  return dao.saveCollection(collection)
})
