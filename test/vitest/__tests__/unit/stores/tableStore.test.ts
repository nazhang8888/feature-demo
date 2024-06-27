import { useTableStore } from '@/stores/tableStore';
import { setActivePinia, createPinia } from 'pinia';

describe.only('Table Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    Object.defineProperty(window, 'localStorage', {
      value: localStorage as Storage,
    });
  });

  it('should be seeded with the correct popup data', async (): Promise<void> => {
    const tableStore = useTableStore();

    const popupState = tableStore.getPopupData;

    expect(popupState.length).toBe(0);
  });

  it('should be seeded with the correct point picker data', async (): Promise<void> => {
    const tableStore = useTableStore();

    const pointPickerState = tableStore.getPointPickerData;

    expect(pointPickerState.length).toBe(1);
  });

  it('should add a point to the point picker data', async (): Promise<void> => {
    const tableStore = useTableStore();

    const newPoint = {
      id: 1,
      type: 'point',
      name: 'newPoint',
      country: '',
      longitude: undefined,
      latitude: undefined,
      description: '',
    };

    tableStore.addPoint(newPoint);

    let pointPickerState = tableStore.getPointPickerData;

    expect(pointPickerState.length).toBe(2);
    expect(pointPickerState[1].name).toBe('newPoint');

    const secondNewPoint = {
      id: 1,
      type: 'point',
      name: 'secondNewPoint',
      country: '',
      longitude: undefined,
      latitude: undefined,
      description: '',
    };

    tableStore.addPoint(secondNewPoint);

    pointPickerState = tableStore.getPointPickerData;

    expect(pointPickerState.length).toBe(3);
  });

  it('should add a point to the popup data', async (): Promise<void> => {
    const tableStore = useTableStore();

    const newPoint = {
      id: 1,
      type: 'popup',
      name: 'newPopup',
      country: '',
      longitude: undefined,
      latitude: undefined,
      description: '',
    };

    tableStore.addPoint(newPoint);

    const popupState = tableStore.getPopupData;

    expect(popupState.length).toBe(1);
    expect(popupState[0].name).toBe('newPopup');
  });

  it('should hydrate the state in the event that the storage is empty', async (): Promise<void> => {
    const tableStore = useTableStore();

    console.log(localStorage.getItem('tableStore'));

    localStorage.clear();

    expect(localStorage.getItem('tableStore')).toBe(null);

    const newPoint = {
      id: 1,
      type: 'popup',
      name: 'newPopup',
      country: '',
      longitude: undefined,
      latitude: undefined,
      description: '',
    };

    tableStore.persistToLocalStorage(newPoint);

    expect(tableStore.persistToLocalStorage(newPoint)).toBe(undefined);

    expect(localStorage.getItem('tableStore')).toMatchInlineSnapshot(
      '"__q_strn|{"savedPoints":[],"popupPoints":[]}"'
    );
  });

  it('should update the state when a point is added', async (): Promise<void> => {
    const tableStore = useTableStore();

    const newPoint = {
      id: 1,
      type: 'point',
      name: 'newPoint',
      country: '',
      longitude: undefined,
      latitude: undefined,
      description: '',
    };

    tableStore.addPoint(newPoint);

    tableStore.updateState;

    expect(tableStore.getPointPickerData.length).toBe(2);
  });

  it('should remove a point from either piece of state', async (): Promise<void> => {
    const tableStore = useTableStore();

    const newPoint = {
      id: 1,
      type: 'point',
      name: 'newPoint',
      country: '',
      longitude: undefined,
      latitude: undefined,
      description: '',
    };

    tableStore.addPoint(newPoint);

    tableStore.updateState;

    expect(tableStore.getPointPickerData.length).toBe(2);

    tableStore.deletePoint(newPoint);

    tableStore.updateState;

    expect(tableStore.getPointPickerData.length).toBe(1);

    const newPopup = {
      id: 1,
      type: 'popup',
      name: 'newPopup',
      country: '',
      longitude: undefined,
      latitude: undefined,
      description: '',
    };

    tableStore.addPoint(newPopup);

    tableStore.updateState;

    expect(tableStore.getPopupData.length).toBe(1);

    tableStore.deletePoint(newPopup);

    tableStore.updateState;

    expect(tableStore.getPopupData.length).toBe(0);
  });
});
