/* eslint-disable import/no-extraneous-dependencies */
// tests/setup.ts
import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import nock from "nock";

nock.disableNetConnect();

expect.extend(matchers);
