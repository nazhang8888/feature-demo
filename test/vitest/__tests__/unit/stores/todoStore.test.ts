import { useTodoStore } from '@/stores/todoStore';
import { createPinia, setActivePinia } from 'pinia';

describe('Todo Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    Object.defineProperty(window, 'localStorage', {
      value: localStorage as Storage,
    });
  });

  it('should be seeded with the correct data', async (): Promise<void> => {
    const todoStore = useTodoStore();

    const todoState = todoStore.getTodos;

    expect(todoState.length).toBe(2);
  });

  it('should return any favorites', async (): Promise<void> => {
    const todoStore = useTodoStore();

    const favorites = todoStore.favorites;

    expect(favorites.length).toBe(1);
  });

  it('should return the correct count of todos', async (): Promise<void> => {
    const todoStore = useTodoStore();

    const count = todoStore.count;

    expect(count).toBe(2);
  });

  it('should return the correct count of favorited todos', async (): Promise<void> => {
    const todoStore = useTodoStore();

    const count = todoStore.favoritesCount;

    expect(count).toBe(1);
  });

  it('should add a new todo', async (): Promise<void> => {
    const todoStore = useTodoStore();

    const newTodo = {
      id: 2,
      title: 'buy some eggs',
      isFavorite: false,
    };

    todoStore.addTodo(newTodo);

    const todoState = todoStore.getTodos;
    console.log(todoState);

    expect(todoState.length).toBe(3);
    expect(todoState[2].title).toBe('buy some eggs');
  });

  it('should remove a todo', async (): Promise<void> => {
    const todoStore = useTodoStore();

    todoStore.finishTodo(2);

    const todoState = todoStore.getTodos;
    expect(todoState.length).toBe(2);
  });

  it('should toggle a todo as a favorite', async (): Promise<void> => {
    const todoStore = useTodoStore();

    todoStore.toggleFavorite(undefined);
    expect(todoStore.favoritesCount).toBe(1);

    todoStore.toggleFavorite(0);

    const todoState = todoStore.getTodos;
    expect(todoState[0].isFavorite).toBe(true);
  });
});
