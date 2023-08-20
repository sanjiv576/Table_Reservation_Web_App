import { configure } from "jest";
import { defaults } from "jest-config";

configure({
  ...defaults,
  extensionsToTreatAsEsm: [".ts", ".tsx"],
});
