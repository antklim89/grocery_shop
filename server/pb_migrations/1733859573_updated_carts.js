/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("5saj5ti2g06q2nv")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = owner.id",
    "deleteRule": "@request.auth.id = owner.id",
    "updateRule": "@request.auth.id = owner.id",
    "viewRule": "@request.auth.id = owner.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("5saj5ti2g06q2nv")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
