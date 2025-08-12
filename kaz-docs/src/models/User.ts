import mongoose, { Document, Schema } from 'mongoose';

// Interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'super_admin';
  active: boolean;
  subscriptionType?: mongoose.Types.ObjectId;
  paymentStatus?: 'paid' | 'pending' | 'failed';
  paymentMethod?: string;
  paymentDate?: Date;
  paymentAmount?: number;
  expirationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: mongoose.Types.ObjectId;
  deletedReason?: string;
}

// User Schema
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'super_admin'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
  },
  subscriptionType: {
    type: Schema.Types.ObjectId,
    ref: 'SubscriptionType',
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'failed'],
  },
  paymentMethod: {
    type: String,
  },
  paymentDate: {
    type: Date,
  },
  paymentAmount: {
    type: Number,
  },
  expirationDate: {
    type: Date,
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
}, {
  timestamps: true, // This adds createdAt and updatedAt automatically
});

// Index for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ active: 1 });

// Export the model
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
