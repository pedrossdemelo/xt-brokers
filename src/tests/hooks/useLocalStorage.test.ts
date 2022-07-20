import { useLocalStorage } from "hooks";
import { renderHook } from "tests";
import { vi } from "vitest";

describe("useLocalStorage", () => {
  it("should check if key is in localStorage before writing", () => {
    const spyGET = vi.spyOn(Storage.prototype, "getItem");
    const spySET = vi.spyOn(Storage.prototype, "setItem");

    const key = "test";
    const initialState = { foo: "bar" };
    const initialStateJSON = JSON.stringify(initialState);

    const { result } = renderHook(() => useLocalStorage(key, initialState), {
      wrapper: undefined,
    }); // No wrapper because we're not rendering anything.

    expect(spyGET).toHaveBeenCalledWith(key);

    expect(spySET).toHaveBeenCalledWith(key, initialStateJSON);
  });

  it("should return and set the initialState if the key is not in localStorage", () => {
    const spyGET = vi.spyOn(Storage.prototype, "getItem");
    const spySET = vi.spyOn(Storage.prototype, "setItem");

    const key = "test";
    const initialState = { foo: "bar" };

    const { result } = renderHook(() => useLocalStorage(key, initialState), {
      wrapper: undefined,
    });

    const [state] = result.current;

    expect(state).toStrictEqual(initialState);
  });

  it("should return the stored value if the item is in localStorage", () => {
    const spyGET = vi.spyOn(Storage.prototype, "getItem");
    const spySET = vi.spyOn(Storage.prototype, "setItem");

    const key = "test";
    const initialState = { foo: "bar" };

    const storedState = { foo: "baz" };
    const storedStateValue = JSON.stringify(storedState);

    const store: { [key: string]: any } = {
      [key]: storedStateValue,
    };

    spyGET.mockImplementation((key) => store[key] ?? null);
    spySET.mockImplementation((key, value) => (store[key] = value));

    const { result } = renderHook(() => useLocalStorage(key, initialState), {
      wrapper: undefined,
    });

    const [state] = result.current;

    expect(state).toStrictEqual(storedState);

    expect(spyGET).toHaveBeenCalledWith(key);

    expect(spySET).not.toHaveBeenCalled();
  });

  it("should be able to set a value", () => {
    const spyGET = vi.spyOn(Storage.prototype, "getItem");
    const spySET = vi.spyOn(Storage.prototype, "setItem");

    const key = "test";
    const initialState = { foo: "bar" };

    const storedState = { foo: "baz" };
    const storedStateValue = JSON.stringify(storedState);

    const newValue = { foo: "qux" };
    const newValueJSON = JSON.stringify(newValue);

    const store: { [key: string]: any } = {
      [key]: storedStateValue,
    };

    spyGET.mockImplementation((key) => store[key] ?? null);
    spySET.mockImplementation((key, value) => (store[key] = value));

    const { result } = renderHook(() => useLocalStorage(key, initialState), {
      wrapper: undefined,
    });

    const [value, setValue] = result.current;

    expect(value).toStrictEqual(storedState);

    setValue(newValue);

    expect(spySET).toHaveBeenCalledWith(key, newValueJSON);
  });
});
