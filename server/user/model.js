class User {
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.exercises = [];
        this.reps = [];
        this.steps;
        this.miles = this.steps / 2000;

    }
}



module.exports = {
    User
}