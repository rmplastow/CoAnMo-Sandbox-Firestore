import { ActionContextI, ActionI } from "coanmo-plugin-cli";
import { about } from "./about";
const { fn } = about;

// Mocks.

const mockContext: ActionContextI = {
  $stdout: null,
  actions: [],
  doc: {} as Document,
  meta: "Mock-Meta",
  name: "Mock-About",
  setStore() {
    return;
  },
  store: {},
  version: "1.2.3"
};

// Public functions.

describe("about.fn()", () => {
  it("returns the expected string when passed no arguments", () => {
    expect(fn([], mockContext)).toContain(
      "These instructions explain how to:\n  1. "
    );
  });
  it("returns as expected when passed '1'", () => {
    expect(fn(["1"], mockContext)).toContain(
      "1. Create a new Google account\n\n"
    );
  });
  it("returns an error when passed '0'", () => {
    expect(fn(["0"], mockContext)).toBe(
      "ERROR: 'about' expected a positive integer, but got '0'"
    );
  });
  it("returns an error when passed 'not-a-number'", () => {
    expect(fn(["not-a-number"], mockContext)).toBe(
      "ERROR: 'about' expected a positive integer, but got 'not-a-number'"
    );
  });
  it("returns an error when passed '9999'", () => {
    expect(fn(["9999"], mockContext)).toBe(
      "ERROR: 'about' has no section '9999' — try '1'"
    );
  });
  it("returns an error when passed two arguments", () => {
    expect(fn(["1", "2"], mockContext)).toBe(
      "ERROR: 'about' expected 0 or 1 args, but got 2"
    );
  });
});
