import {pathKeys} from './api_paths'
import { nanoquery } from '@nanostores/query';
import {atom} from 'nanostores'
import { getCollection } from './readFactory';
import { updateCollection } from './updateFactory';

let createAtoms = (as)=>{

    let res = {}
    as.forEach(a=>res[a]=atom("1"))
    return res

}

const createMutator=(creator, collection) => creator(async ({ data: details, revalidate, getCacheUpdater }) => {
    
     const [updateCache, curr] = getCacheUpdater(`${collection}/${details.id}`);
    updateCache({...curr, ...details});
    return await updateCollection(collection, details.id, {...curr, ...details})
}

)


let createStore = (collection)=> {
        const [createFetcherStore, createMutatorStore] = nanoquery({
        fetcher: async (...keys) => {

            let res = await getCollection(collection.collection, {where:{id:{equals:keys[1]}}})
        
        return  {...res, collection:collection.collection}
  }
  });

    let atoms = collection.args ? createAtoms(collection.args) :[]

    let updater = collection.actions.includes("U") ? createMutator(createMutatorStore, collection.collection) :{}

    return ({
        store: createFetcherStore([collection.collection+"/", ...Object.keys(atoms).map(a=>atoms[a])]),
        args:atoms,
        ...{updater }
    })

}

let collections= [
    {collection:"participant", "args":["id"], actions:["U", "R"]},
    {collection:"experiment", args:["id"], actions:["U", "R"]},
    {collection:"study_slot", actions:["U", "R"]}


]

let factory = (collections)=>{


    let store = {}
    collections.forEach(s=>{store[s.collection]= createStore(s)})


    return store
}


export default factory(collections)