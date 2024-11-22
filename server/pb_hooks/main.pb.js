/// <reference path="../pb_data/types.d.ts" />


$app.rootCmd.addCommand(new Command({
  use: 'fake-data',
  run: () => {
    const collection = $app.dao().findCollectionByNameOrId('products');

    const record = new Record(collection, {
      name: 'TEST',
      price: 600,
      discount: 10,
      description: 'Fake product',
      images: [],
      category: 'vegetables',
      country: 'Peru',
      batch: 100,
      unit: 'liter',
    });

    console.log(record)

    $app.dao().saveRecord(record);
  }
}))