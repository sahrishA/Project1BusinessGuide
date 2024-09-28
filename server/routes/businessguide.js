import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import businessData from '../data/businessguide.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname =path.dirname(__filename)
const router = express.Router()
router.get('/',(req,res)=>{
    res.status(200).json(businessData)
})
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < businessData.length) {
      res.status(200).json(businessData[id]);
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  });
  
export default router