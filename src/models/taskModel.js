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
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'overdue', 'completed'],
        default: 'pending',
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

    // Update status based on completion and due date
    if (this.status === 'completed') {
        // do nothing
    } else if (this.dueDate && this.dueDate < today) {
        this.status = 'overdue';
    } else if (this.updatedAt > this.createdAt) {
        this.status = 'in-progress';
    } else {
        this.status = 'pending';
    }

    next();
});

module.exports = mongoose.model('Task', taskSchema);