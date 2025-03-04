import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:5173',
    origin: true, // ✅ Allow all origins for debugging
    credentials: true,
};


export default cors(corsOptions);
