import * as z from "zod"

class ValidationFactory{
    constructor(obj){
        this.obj = obj
        this._schema = {}

    }

    create(){
        for(let k in this.obj){
            this._schema[k] = this.mapping(this.obj[k])

        }

        this.schema = z.object(this._schema)
        return this

    }


    mapping(item){
        switch(item){
            case "text":
                return z.string()
            case "number":
                return z.number()
        }
    }

    parse(obj){
       return this.schema.parse(obj)
    }  
}

let X = {"name":"text", "surname":"text", "age":"number"}

let schema = new ValidationFactory(X).create()

let p1 = {name:"ed", surname:"legg", age:"36"}
console.log(schema.parse(p1))