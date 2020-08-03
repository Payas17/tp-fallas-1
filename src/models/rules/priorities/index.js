import { rule } from "../clean/clean";
import { indeterminate } from "../indeterminate";
import { paramsDomain } from "../paramsDomain";
export const Priorities = {
  [paramsDomain.name]: 3,
  [indeterminate.name]: 2,
  [rule.name]: 1,
}