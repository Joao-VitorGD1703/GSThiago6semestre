import mongoose from 'mongoose';

const mongoURI = "mongodb://root:example@localhost:27018/Energiarenova?authSource=admin";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;