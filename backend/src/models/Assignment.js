import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
  personnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  equipmentType: { type: mongoose.Schema.Types.ObjectId, ref: 'EquipmentType', required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['ASSIGNED', 'RETURNED'], default: 'ASSIGNED' },
}, { timestamps: true });

export default mongoose.models.Assignment || mongoose.model('Assignment', AssignmentSchema);
