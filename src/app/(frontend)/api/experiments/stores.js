
import { nanoquery } from "@nanostores/query";
import { getExperiments } from "./read";
import { queries } from "./queries";
import { atom } from "nanostores";
import { createExperiment } from "./update";

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: async (...keys) => {

      let res = await getExperiments(queries[keys[1]](keys[2]))
   
  return  {...res, key:keys.join("/")}
  }
});

export let $updateExperiment = createMutatorStore(async ({ data: experimentDetails, revalidate, getCacheUpdater }) => {
    // You can either revalidate the author…
    console.log("UPDATING")
     const [updateCache, exp] = getCacheUpdater(`/api/experiment/find1`);
     console.log(exp)
    updateCache({...exp, experimentDetails});
    return await createExperiment({...experimentDetails})
}

)


export const $experimentId = atom("1")
export const $currentExperiment = createFetcherStore(['/api/experiment/', "find", $experimentId]);
