import { invoke } from "@withease/factories";
import { api } from "shared/api";
import { loadingInViewFactory } from "shared/lib/in-view-loading";

export const leadboard = invoke(loadingInViewFactory<unknown, any[]>, {
    effect: api.users.query.getLeadboardProfileIdFx
})