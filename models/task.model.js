const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    dayCreated: { type: String },
    dueDate: { type: Date },
}
    , {
        timestamps: true,
    });

//Automatically set dayCreated before saving
taskSchema.pre("save", function (next) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    this.dayCreated = days[today.getDay()];
    next();
});

module.exports = mongoose.model('Task', taskSchema);