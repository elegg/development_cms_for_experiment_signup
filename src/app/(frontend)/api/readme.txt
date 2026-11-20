STORES AND QUERIES

## PARTICIPANTS

- Update ME
    /api/me

- Read Info by participant.ID 
        /api/participant/{id}

- Read Slots by participant.ID
        /api/participant/{id}/slot

- Update Slots by participant.ID (to schedule/change schedule)
        /api/participant/{id}/slot

- Read Experiments by status by participant.ID
        /api/participant/{id}/experiment?status={status}
        ** status is derived

- Read Channels by participant.ID
        /api/participant/{id}/Channels

- Read/Write Messages by Channel (to message research team)
    /api/participant/{id}/Channels

- Read Outcomes 
    /api/experiment/{experiment}/outcome

## Researcher

- Update ME
    /api/me

- Create/Update/Delete Experiment (delete only available for drafts)
    /api/experiment

- Create/Update/Delete Experiment_ResearchTeam
    /api/experiment_team

- Create/Update/Delete Experiment_Slots
    /api/slots

- Read/Write Messages by Channel (to message research team/participants)
    /api/participant/{id}/Channels


-- Read Participants By Experiments
    /api/experiment/{experiment}/participant

-- Write Experiment Outcomes
    /api/experiment/{id}/outcome

    
## 



