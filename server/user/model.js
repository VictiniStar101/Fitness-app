class Profile {
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.exercises = [];
        this.reps = [];
        this.steps;
        this.miles = this.steps / 2000;
        this.password = '';

    }
}



module.exports = {
    Profile
}
