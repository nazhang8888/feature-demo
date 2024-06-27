import { setActivePinia, createPinia } from 'pinia';
import { useMapStore } from '@/stores/mapStore';
import { beforeEach, describe, expect, it } from 'vitest';
import { Map } from 'ol';

describe('Map Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const ResizeObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  it('gets the Map object from the current state', () => {
    const mapStore = useMapStore();
    const mapState = mapStore.getMap;
    expect(mapState).toBeInstanceOf(Map);
  });

  it('sets the Map object as the current state', () => {
    const mapStore = useMapStore();
    expect(mapStore.$state.map).toBeInstanceOf(Map);

    const element = document.createElement('div');
    element.id = 'newMap';
    document.body.appendChild(element);
    const newMap = new Map({ target: element });
    expect(newMap).not.toBe(mapStore.$state.map);

    mapStore.setMap(newMap);
    expect(mapStore.$state.map).toStrictEqual(newMap);
  });
});
