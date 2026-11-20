
  export let pathKeys= {
        me:{path:"/api/me"},
        participant:{path:"/api/participant/{id}", args:["id"]},
        participant_slots:{path:"/api/participant/{id}/slot", args:["id"]},
        participant_experiment_status:{path:"/api/participant/{id}/experiment?status={status}", args:["id", "status"]},
        participant_channels:{path:"/api/participant/{id}/channel", args:["id"]},
        experiment:{path:"/api/experiment"},
        experiment_team:{path:"/api/experiment_team"},
        slots:{path:"/api/slots"},
        experiment_slots:{path:"/api/experiment/{experiment}/slot", args:["experiment"]},
        experiment_outcomes:{path:"/api/experiment/{id}/outcome",args:["id"]},
        experiment_participant:{path:"/api/experiment/{experiment}/participant", args:["experiment"]},
        messages:{path:"api/messages"}

  }

    export let collections= ["participant", "experiment", "study_slot"]


