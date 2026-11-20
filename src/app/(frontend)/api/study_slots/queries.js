export let queries = {
    "allSlots":(id)=> ({}),
    "allParticipantSlots":(id)=> ({where:{"participant.id":{equals:id}}}),
    "allExperimentSlots":(id)=> ({where:{"experiment.id":{equals:id}}}),
    "completed":(id)=> ({where:{"participant.id":{equals:id}}}),
    "find":(id)=>({where:{id:{equals:id}}})
}