import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
 import businessGuideRouter from './routes/businessguide.js';
const app = express()
// Recreate __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use('/public',express.static('./public'))
// app.use('/script',express.static('./public/scripts'))
app.use('/public', express.static(path.join(__dirname, '../client/public')));
app.use('/images', express.static(path.join(__dirname, '../client/public/scripts/images'))); // Serve images

app.use('/business',businessGuideRouter);
// app.get('/',(req,res)=>{
// 	res.status(200).send('<h1 style="text-align: center;margin-top:50px;">Business Guide</h1>')
// });
app.use('/images', express.static(path.join(__dirname, '../client/public/server/images')));
// businessGuideRouter.get('/',(req,res)=>{
// 	res.status(200).send('<h1 style="text-align: center;margin-top:50px;">Business Guide</h1>')

// });
// Serve the index.html file for the homepage
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
  });
app.use((req, res) => {
	res.status(404).sendFile(path.resolve(__dirname, '../client/public/scripts/404.html'));
  });
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
	console.log(`server listening on http://localhost:${PORT}`)
})
