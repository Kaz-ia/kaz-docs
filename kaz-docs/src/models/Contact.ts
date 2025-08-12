import mongoose, { Document, Schema } from 'mongoose';

// Interface for Contact document
export interface IContact extends Document {
  fullname: string;
  email: string;
  company?: string;
  sector?: string;
  subscriptionType?: mongoose.Types.ObjectId;
  message?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

// Contact Schema
const ContactSchema: Schema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  sector: {
    type: String,
    trim: true,
  },
  subscriptionType: {
    type: Schema.Types.ObjectId,
    ref: 'SubscriptionType',
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'closed'],
    default: 'new',
  },
}, {
  timestamps: true,
});

// Index for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 });

// Export the model
export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
