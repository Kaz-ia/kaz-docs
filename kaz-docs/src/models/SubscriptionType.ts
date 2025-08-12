import mongoose, { Document, Schema } from 'mongoose';

// Interface for SubscriptionType document
export interface ISubscriptionType extends Document {
  name: string;
  price: number;
  duration: number; // in days
  features: string[];
  maxProspects?: number;
  maxDailyCalls?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: mongoose.Types.ObjectId;
  deletedReason?: string;
  expirationDate?: Date;
}

// SubscriptionType Schema
const SubscriptionTypeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1, // at least 1 day
  },
  features: [{
    type: String,
    trim: true,
  }],
  maxProspects: {
    type: Number,
    min: 0,
  },
  maxDailyCalls: {
    type: Number,
    min: 0,
  },
  whiteLabelEnabled: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
  deletedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  deletedReason: {
    type: String,
  },
  expirationDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for better query performance
SubscriptionTypeSchema.index({ name: 1 });
SubscriptionTypeSchema.index({ price: 1 });

// Export the model
export default mongoose.models.SubscriptionType || mongoose.model<ISubscriptionType>('SubscriptionType', SubscriptionTypeSchema);
