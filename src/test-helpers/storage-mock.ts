/**
 * Implementation of localStorage object
 */
class LocalStorageMock implements Storage {
  private store = new Map<string, string>()

  clear(): void {
    this.store.clear()
  }

  getItem(key: string): string | null {
    return this.store.get(String(key)) ?? null
  }

  removeItem(key: string): void {
    this.store.delete(String(key))
  }

  key(index: number): string | null {
    return index < 0 || index >= this.length ? null : Object.keys(this.store)[index]
  }

  setItem(key: string, value: string): void {
    this.store.set(String(key), String(value))
  }

  get length(): number {
    return this.store.size
  }
}

/**
 * localStorage instance
 */
const localStorageMock = new LocalStorageMock()

/**
 * Simulates browser's localStorage
 */
export const mockLocalStorage = () => {
  window.localStorage = localStorageMock
}
