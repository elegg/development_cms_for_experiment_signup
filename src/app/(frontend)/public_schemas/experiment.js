export const Experiment = {
    slug:"experiment",
    actions:["edit", "preview", "save"],
    fields:[
        {type:"text",
            name:"title",
            require:true,
            default:"Title"
        },
        {
            type:"text",
            name:"shortDescription",
             require:true,
             default:"Description here"
        },
        {
            type:"number",
            name:"places",
            require:true,
            default:42
        }
    ]
}