const express = require('express');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.get('/', (res) => res.send('OurFin API'));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
 