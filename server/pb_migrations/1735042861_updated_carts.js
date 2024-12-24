/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("5saj5ti2g06q2nv")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_JuW2JNU1ZF` ON `carts` (\"owner\", \"product\")"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("5saj5ti2g06q2nv")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
