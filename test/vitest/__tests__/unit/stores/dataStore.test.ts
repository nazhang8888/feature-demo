import { setActivePinia, createPinia } from 'pinia';
import { useDataStore } from '@/stores/dataStore';

describe('Data Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    Object.defineProperty(window, 'localStorage', {
      value: localStorage as Storage,
    });
  });

  it('should be seeded with the correct data', async (): Promise<void> => {
    const dataStore = useDataStore();
    const dataState = dataStore.getFeatureCollections;

    expect(dataState.length).toBe(4);
  });
  it('should return the correct feature collection names', async (): Promise<void> => {
    const dataStore = useDataStore();
    const names = dataStore.getFeatureCollectionNames;

    expect(names.length).toBe(4);
    expect(names).toMatchInlineSnapshot(`
      [
        "outline",
        "countries",
        "states",
        "counties",
      ]
    `);
  });

  it('should add a new layer to the store', async (): Promise<void> => {
    const dataStore = useDataStore();
    const newLayer = {
      id: 4,
      name: 'newLayer',
      data: { type: 'FeatureCollection', features: [] },
    };
    dataStore.addFeatureCollection(newLayer);
    const dataState = dataStore.getFeatureCollections;

    expect(dataState.length).toBe(5);
    expect(dataState[4].name).toBe('newLayer');
  });

  it('should remove a layer from the store', async (): Promise<void> => {
    const dataStore = useDataStore();

    dataStore.deleteFeatureCollection(4);
    const newDataState = dataStore.getFeatureCollections;

    expect(newDataState.length).toBe(4);
  });
});
