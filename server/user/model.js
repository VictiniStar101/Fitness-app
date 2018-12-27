class User {
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.exercises = [];
        this.reps = [];
    }
}



module.exports = {
    User
}