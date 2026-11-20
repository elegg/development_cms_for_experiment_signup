
export let queries = {
    "notTaken":(id)=> ({where:{"participant.id":{not_equals:id}}}),
    "scheduled":(id)=> ({where:{"participant.id":{equals:id}}}),
    "completed":(id)=> ({where:{"participant.id":{equals:id}}}),
    "find":(id)=>({where:{id:{equals:id}}})
}