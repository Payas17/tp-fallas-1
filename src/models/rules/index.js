import { Clean } from "./clean";
import { ParamsDomain } from "./paramsDomain";
import { Indeterminate } from "./indeterminate";
import { ruleNames } from "./rule_names";

export const rules = {
  [ruleNames.clean]: new Clean(),
  [ruleNames.paramsDomain]: new ParamsDomain(),
  [ruleNames.indeterminate]: new Indeterminate()
};

export { ruleNames };
