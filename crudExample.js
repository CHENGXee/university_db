// crudExample.js
const pool = require('./db');

/**
 * 檢查學號格式是否正確
 * @param {string} studentId - 學生學號
 * @returns {boolean} - 是否合法
 */
function validateStudentId(studentId) {
    const regex = /^S\d{8}$/;
    return regex.test(studentId);
}

async function basicCrud() {
    let conn;
    try {
        conn = await pool.getConnection();

         // 1. INSERT 新增
         const newStudentId = 'S10810001';
         if (!validateStudentId(newStudentId)) {
             console.error('新增失敗：學號格式不正確');
             return;
         }
 
         let sql = 'INSERT INTO STUDENT (Student_ID, Name, Gender, Email, Department_ID) VALUES (?, ?, ?, ?, ?)';
         await conn.query(sql, [newStudentId, '王曉明', 'M', 'wang@example.com', 'CS001']);
         console.log('已新增一筆學生資料');

        // 2. SELECT 查詢
        const queryStudentId = 'S10721001';
        if (!validateStudentId(queryStudentId)) {
            console.error('查詢失敗：學號格式不正確');
            return;
        }

        sql = 'SELECT * FROM STUDENT WHERE Student_ID = ?';
        const rows = await conn.query(sql, [queryStudentId]);
        console.log('查詢結果：', rows);

        // 3. UPDATE 更新
        const updateStudentId = 'S10721002';
        if (!validateStudentId(updateStudentId)) {
            console.error('更新失敗：學號格式不正確');
            return;
        }

        sql = 'UPDATE STUDENT SET Name = ? WHERE Student_ID = ?';
        const update = await conn.query(sql, ['趙大美', updateStudentId]);
        if (update.affectedRows <= 0) {
            console.log("更新失敗");
            return;
        }
        console.log("更新成功");

        // 4. DELETE 刪除
        const deleteStudentId = 'S10810001';
        if (!validateStudentId(deleteStudentId)) {
            console.error('刪除失敗：學號格式不正確');
            return;
        }

        sql = 'DELETE FROM STUDENT WHERE Student_ID = ?';
        await conn.query(sql, [deleteStudentId]);
        console.log('已刪除該學生');


    } catch (err) {
        console.error('操作失敗：', err);
    } finally {
        if (conn) conn.release();
    }
}

basicCrud();
