const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 创建 Express 应用
const app = express();

// 中间件
app.use(cors()); // 允许跨域请求
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// 基本路由
app.get('/', (req, res) => {
  res.json({ message: '宠物契合度预测API已启动' });
});

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});