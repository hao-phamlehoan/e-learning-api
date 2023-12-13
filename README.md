# HOW TO SETUP
1. Run UNIPDB.sql in data folder to use policies.
2. Create file .env from .env-example
# HOW TO RUN
```
npm i
npm run dev
```
# NOTES
1. role (LAB_USER): 'teacher', 'parent', 'student', 'manager'
2. delete: '1' => NOT DELETED, '0' => DELETED
3. is_active (LAB_CLASS): 'TRUE' => ACTIVE, 'FALSE' => PENDING
4. OLS LEVEL: 'P', 'C', 'S'
5. @C:\db_home\rdbms\admin\catols.sql
6. Special character in password: '#', '_', '$'
7. Sau khi chạy xong từ dòng 1 tới dòng 757, đăng nhập lại vào tài khoản SYSADM rồi chạy lại từ dòng 404 tới 614
