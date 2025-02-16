import mongoose from 'mongoose';

const MetaDataSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
});

export default MetaDataSchema;
