// transactionExample.js
const pool = require('./db');

async function doTransaction() {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction(); // 開始交易

        const studentId = 'S10811004';
        const newDeptId = 'EE001';

        // 先檢查該學號是否存在
        const checkStudent = 'SELECT * FROM STUDENT WHERE Student_ID = ?';
        const [rows] = await conn.query(checkStudent, [studentId]);

        if (rows.length === 0) {
            throw new Error(`學號 ${studentId} 不存在，無法更新`);
        }

        // 學號存在，進行更新
        const updateStudent = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
        await conn.query(updateStudent, [newDeptId, studentId]);

        await conn.commit();
        console.log('交易成功，已提交');
        sql = 'SELECT * FROM STUDENT WHERE Student_ID = ?';
        const stu = await conn.query(sql, [studentId]);
        console.log('查詢結果：', stu);
    } catch (err) {
        if (conn) await conn.rollback();
        console.error('交易失敗，已回滾：', err.message);
    } finally {
        if (conn) conn.release();
    }
}

doTransaction();
