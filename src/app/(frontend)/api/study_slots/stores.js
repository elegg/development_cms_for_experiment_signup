
import { nanoquery } from "@nanostores/query";
import { getSlot } from "./readSlots";
import { queries } from "./queries";
import { atom } from "nanostores";
import { updateParticipantSlot } from "../participants/updateParticipantStudySlots";
import { removeSlot } from "./updateSlots";

export const $slotId = atom("1")

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: async (...keys) => {

    console.log(keys)
      let res = await getSlot(queries.allParticipantSlots(keys[1]))
   
  return  {...res}//await getSlot(queries.find(keys[1].id))//{...res, key:keys.join("/")}
  }
});

export let $removeSlot = createMutatorStore(async ({ data: slotDetails, revalidate, getCacheUpdater }) => {
     const [updateCache, slot] = getCacheUpdater(`/api/slot/1`);
    
    updateCache({...slot, participant:null});
    return removeSlot(slotDetails.id)
}

)

const queryFactory = (query)=>{
   
   return nanoquery({

        fetcher: query
    })
}




export const $currentSlot = createFetcherStore(['/api/slot/', $slotId]);
