// testConnection.js
const { sequelize } = require('./orm');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('資料庫連接成功!');
    return true;
  } catch (error) {
    console.error('資料庫連接失敗:', error);
    return false;
  }
}

testConnection();