import mongoose from 'mongoose';

const EquipmentTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String, default: 'units' },
}, { timestamps: true });

export default mongoose.models.EquipmentType || mongoose.model('EquipmentType', EquipmentTypeSchema);
