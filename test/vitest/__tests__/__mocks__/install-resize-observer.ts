import ResizeObserverMock from './resize-observer';

export const installResizeObserver = vi.fn(() => {
  beforeEach(() => {
    global.ResizeObserver = ResizeObserverMock;
  });
});
