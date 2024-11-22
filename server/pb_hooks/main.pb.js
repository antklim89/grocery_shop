/// <reference path="../pb_data/types.d.ts" />

const { faker } = require('@faker-js/faker');


$app.rootCmd.addCommand(new Command({
  use: 'fake-data',
  run: () => {
    const units = ['gram', 'kilogram', 'milligram', 'milliliter', 'liter', 'milliliter', 'piece'];
    const collection = $app.dao().findCollectionByNameOrId('products');

    for (let index = 0; index < 20; index++) {
      const record = new Record(collection);
      const form = new RecordUpsertForm($app, record);

      form.loadData({
        name: faker.commerce.productName(),
        price: faker.commerce.price({min: 100, max: 1000, dec: 0}),
        discount: Math.random() < 0.5 ? faker.number.int({ min: 10, max: 90 }) : 0,
        description: faker.lorem.sentences({ min: 3, max: 10 }),
        category: 'vegetables',
        country: faker.location.country(),
        batch: Math.random() < 0.5 ? faker.number.int({ min: 10, max: 90 }) : 1,
        unit: units[Math.floor(Math.random() * units.length)],
      })

      const img = $filesystem.fileFromPath(`${__hooks}/img1.png`);
      form.addFiles('images', img)

      form.submit();
    }
  }
}))