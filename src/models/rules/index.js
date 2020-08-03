import { Clean } from "./clean";
import { ParamsDomain } from "./paramsDomain";
import { Indeterminate } from "./indeterminate";

export const rules = {
  [Clean.name]: new Clean(),
  [ParamsDomain.name]: new ParamsDomain(),
  [Indeterminate.name]: new Indeterminate()
};
