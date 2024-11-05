/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ph4jea3ysfn6gju")

  collection.listRule = ""

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4pyiskxt",
    "name": "price",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "buf8jbzi",
    "name": "discount",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 99,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tgroi19t",
    "name": "country",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 500,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hjnvvaxl",
    "name": "unit",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "gram",
        "kilogram",
        "milligram",
        "milliliter",
        "liter",
        "milliliter",
        "piece"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kf3ah90j",
    "name": "category",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a00hcf2y",
    "name": "description",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 5,
      "max": 50000,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ph4jea3ysfn6gju")

  collection.listRule = null

  // remove
  collection.schema.removeField("4pyiskxt")

  // remove
  collection.schema.removeField("buf8jbzi")

  // remove
  collection.schema.removeField("tgroi19t")

  // remove
  collection.schema.removeField("hjnvvaxl")

  // remove
  collection.schema.removeField("kf3ah90j")

  // remove
  collection.schema.removeField("a00hcf2y")

  return dao.saveCollection(collection)
})
