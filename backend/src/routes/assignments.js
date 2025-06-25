import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { permit } from '../middleware/rbac.js';
import Assignment from '../models/Assignment.js';
import Transaction from '../models/Transaction.js';
import Asset from '../models/Asset.js';
import { audit } from '../middleware/logger.js';

const router = express.Router();

// Assign
router.post('/', authenticate, permit('ADMIN','COMMANDER'), async (req, res) => {
  const { personnelId, equipmentTypeId, quantity } = req.body;
  const assign = await Assignment.create({ personnelId, 
    equipmentType: equipmentTypeId, quantity });
  // log as transaction
  const tx = await Transaction.create({ type: 'ASSIGN', baseFrom: req.user.base, equipmentType: equipmentTypeId, quantity, performedBy: req.user.id });
  await Asset.findOneAndUpdate({ base: req.user.base, equipmentType: equipmentTypeId }, { $inc: { quantity: -quantity } });
  await audit('Assignment', assign._id, null, assign, req.user.id);
  await audit('Transaction', tx._id, null, tx, req.user.id);
  res.json({ assign, tx });
});
// Record Expenditure
router.post('/expend', authenticate, permit('ADMIN','COMMANDER'), async (req, res) => {
  const { equipmentTypeId, quantity } = req.body;
  const tx = await Transaction.create({ type: 'EXPEND', baseFrom: req.user.base, equipmentType: equipmentTypeId, quantity, performedBy: req.user.id });
  await audit('Transaction', tx._id, null, tx, req.user.id);
  res.json(tx);
});

// Get Assignments
router.get('/', authenticate, permit('ADMIN','COMMANDER'), async (req, res) => {
  const filter = {};
  if (req.user.role === 'COMMANDER') filter.base = req.user.base;
  const assigns = await Assignment.find(filter);
  res.json(assigns);
});
export default router;
