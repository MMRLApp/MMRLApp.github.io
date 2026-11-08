import { strict as assert } from "node:assert";
import { test } from "node:test";
import { moduleRouteId } from "../docs/helper/moduleRouteId.ts";

test("keeps lowercase module routes unchanged", () => {
  assert.equal(moduleRouteId("custom-certificate-authorities"), "custom-certificate-authorities");
});

test("distinguishes module IDs even when output filenames are case-insensitive", () => {
  const ids = [
    "Custom-Certificate-Authorities",
    "custom-certificate-authorities",
    "~43~ustom-certificate-authorities",
    "Ä",
    "ä",
  ];
  const routes = ids.map((id) => moduleRouteId(id).toLowerCase());
  assert.equal(new Set(routes).size, ids.length);
  assert.equal(moduleRouteId(ids[0]), "~43~ustom-~43~ertificate-~41~uthorities");
});
