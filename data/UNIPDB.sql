------------------------------
------------------------------
-----------  USER  -----------
------------------------------
------------------------------

/********** CREATE PDB **********/

CREATE PLUGGABLE DATABASE unipdb ADMIN USER SYSADM IDENTIFIED BY admin FILE_NAME_CONVERT = ('pdbseed', 'unipdb');

ALTER SESSION SET container = unipdb;

ALTER DATABASE OPEN;

/********** GRANT SYSADM PRIVILEGES **********/

GRANT DBA TO SYSADM;

GRANT EXEMPT ACCESS POLICY TO SYSADM;

/********** ENABLE OLS **********/

-- @C:\db_home\rdbms\admin\catols.sql
@E:\Downloads\WINDOWS.X64_213000_db_home\rdbms\admin\catols.sql

ALTER SESSION SET container = unipdb;

EXEC LBACSYS.CONFIGURE_OLS;

EXEC LBACSYS.OLS_ENFORCEMENT.ENABLE_OLS;

ALTER USER LBACSYS ACCOUNT UNLOCK;

GRANT INHERIT PRIVILEGES ON USER SYS TO LBACSYS;

/********** OLS POLICIES **********/

CONN SYS/ AS SYSDBA;

ALTER SESSION SET container = unipdb;

BEGIN
    SA_SYSDBA.CREATE_POLICY (
        policy_name => 'ACCESS_NOTIFICATION',
        column_name => 'OLS_NOTI');
END;
/

BEGIN
    SA_SYSDBA.CREATE_POLICY (
        policy_name => 'ACCESS_DOCUMENT',
        column_name => 'OLS_DOC');
END;
/

GRANT ACCESS_NOTIFICATION_DBA TO SYSADM;

GRANT ACCESS_DOCUMENT_DBA TO SYSADM;

GRANT EXECUTE ON sa_components TO SYSADM;

GRANT EXECUTE ON sa_label_admin TO SYSADM;

GRANT EXECUTE ON sa_policy_admin TO SYSADM;

GRANT EXECUTE ON sa_user_admin TO SYSADM;

/********** OLS POLICIES'S LEVELS **********/

BEGIN
    sa_components.create_level
        (policy_name => 'ACCESS_NOTIFICATION',
        long_name => 'PUBLIC',
        short_name => 'P',
        level_num => 100);
END;
/

BEGIN
    sa_components.create_level
        (policy_name => 'ACCESS_NOTIFICATION',
        long_name => 'CONFIDENTIAL',
        short_name => 'C',
        level_num => 200);
END;
/

BEGIN
    sa_components.create_level
        (policy_name => 'ACCESS_NOTIFICATION',
        long_name => 'SECRET',
        short_name => 'S',
        level_num => 300);
END;
/

BEGIN
    sa_components.create_level
        (policy_name => 'ACCESS_DOCUMENT',
        long_name => 'PUBLIC',
        short_name => 'P',
        level_num => 400);
END;
/

BEGIN
    sa_components.create_level
        (policy_name => 'ACCESS_DOCUMENT',
        long_name => 'CONFIDENTIAL',
        short_name => 'C',
        level_num => 500);
END;
/

BEGIN
    sa_components.create_level
        (policy_name => 'ACCESS_DOCUMENT',
        long_name => 'SECRET',
        short_name => 'S',
        level_num => 600);
END;
/

EXECUTE sa_label_admin.create_label('ACCESS_NOTIFICATION',1000,'P');

EXECUTE sa_label_admin.create_label('ACCESS_NOTIFICATION',2000,'C');

EXECUTE sa_label_admin.create_label('ACCESS_NOTIFICATION',3000,'S');

EXECUTE sa_label_admin.create_label('ACCESS_DOCUMENT',4000,'P');

EXECUTE sa_label_admin.create_label('ACCESS_DOCUMENT',5000,'C');

EXECUTE sa_label_admin.create_label('ACCESS_DOCUMENT',6000,'S');

/********** CONNECT TO SYSADM **********/

CONN SYSADM/admin@localhost:1521/unipdb;

ALTER SYSTEM SET RESOURCE_LIMIT = TRUE;

------------------------------
------------------------------
------------------------------
------------------------------
------------------------------

------------------------------
------------------------------
---------- INITIAL -----------
------------------------------
------------------------------

/********** CREATE TABLES **********/

CREATE TABLE lab_user(
    id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    ssn VARCHAR2(20) NOT NULL,
    sex VARCHAR2(30) NOT NULL,
    email VARCHAR2(50) NOT NULL,
    birth DATE NOT NULL,
    phone VARCHAR2(12) NOT NULL,
    name VARCHAR2(50) NOT NULL,
    address VARCHAR2(100) NOT NULL,
    role VARCHAR2(50) NOT NULL,
    dept_id NUMBER NOT NULL,
    user_name VARCHAR2(100) NOT NULL,
    password VARCHAR2(50) NOT NULL,
    avatar VARCHAR2(256) NOT NULL,
    deleted NUMBER(1) DEFAULT 1,
    PRIMARY KEY (id),
    CONSTRAINT unique_ssn UNIQUE (ssn),
    CONSTRAINT unique_user_name UNIQUE (user_name)
);

CREATE TABLE lab_dept(
    id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    location VARCHAR2(256) NOT NULL,
    name VARCHAR2(256) NOT NULL,
    manager_id NUMBER NOT NULL,
    deleted NUMBER(1) DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES lab_user(id)
);

CREATE TABLE lab_subject(
    id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR2(256) NOT NULL,
    code VARCHAR2(256) NOT NULL,
    dept_id NUMBER NOT NULL,
    deleted NUMBER(1) DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (dept_id) REFERENCES lab_dept(id),
    CONSTRAINT unique_code UNIQUE (code)
);

CREATE TABLE lab_class(
    id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR2(256) NOT NULL,
    student_number NUMBER NOT NULL,
    semester VARCHAR2(50) NOT NULL,
    is_active VARCHAR(10) DEFAULT 'FALSE' NOT NULL,
    end_date DATE NOT NULL,
    deleted NUMBER(1) DEFAULT 1,
    PRIMARY KEY (id)
);

CREATE TABLE lab_document(
    id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    title VARCHAR2(256) NOT NULL,
    url VARCHAR2(256) NOT NULL,
    user_id NUMBER NOT NULL,
    class_id NUMBER NOT NULL,
    deleted NUMBER(1) DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES lab_user(id),
    FOREIGN KEY (class_id) REFERENCES lab_class(id)
);

CREATE TABLE lab_learn(
    subject_id NUMBER NOT NULL,
    user_id NUMBER NOT NULL,
    class_id NUMBER NOT NULL,
    final_score FLOAT(126),
    midterm_score FLOAT(126),
    assignment_score FLOAT(126),
    quiz_score FLOAT(126),
    deleted NUMBER(1) DEFAULT 1,
    PRIMARY KEY (subject_id, user_id, class_id),
    FOREIGN KEY (subject_id) REFERENCES lab_subject(id),
    FOREIGN KEY (user_id) REFERENCES lab_user(id),
    FOREIGN KEY (class_id) REFERENCES lab_class(id)
);

CREATE TABLE lab_parent(
    parent_id NUMBER NOT NULL,
    student_id NUMBER NOT NULL,
    deleted NUMBER(1) DEFAULT 1,
    PRIMARY KEY (parent_id, student_id),
    FOREIGN KEY (parent_id) REFERENCES lab_user(id),
    FOREIGN KEY (student_id) REFERENCES lab_user(id)
);

CREATE TABLE lab_teach(
    user_id NUMBER NOT NULL,
    class_id NUMBER NOT NULL,
    deleted NUMBER(1) DEFAULT 1,
    PRIMARY KEY (user_id, class_id),
    FOREIGN KEY (user_id) REFERENCES lab_user(id),
    FOREIGN KEY (class_id) REFERENCES lab_class(id)
);

CREATE TABLE lab_notification(
    id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    mess_body VARCHAR2(256) NOT NULL,
    mess_header VARCHAR2(256) NOT NULL,
    send_date DATE NOT NULL,
    user_id NUMBER NOT NULL,
    class_id NUMBER NOT NULL,
    deleted NUMBER(1) DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES lab_user(id),
    FOREIGN KEY (class_id) REFERENCES lab_class(id)
);

/*********** INSERT DATA ***********/

/* INSERT lab_user DATA */

INSERT INTO lab_user (ssn,sex,email,birth,phone,name,address,role,dept_id,user_name,password,avatar,deleted)
    VALUES (1,'MALE','1@gmail.com',TO_DATE('13-NOV-2023'),'0909191919','DATLE','ABC Street','teacher',1,'DATLE','user','example.com',1);

INSERT INTO lab_user (ssn,sex,email,birth,phone,name,address,role,dept_id,user_name,password,avatar,deleted)
    VALUES (2,'FEMALE','2@gmail.com',TO_DATE('14-NOV-2023'),'0909191920','DAT2','ABCD Street','teacher',2,'LONGBIEN','user','example.com',1);

INSERT INTO lab_user (ssn,sex,email,birth,phone,name,address,role,dept_id,user_name,password,avatar,deleted)
    VALUES (3,'FEMALE','3@gmail.com',TO_DATE('15-NOV-2023'),'0909191921','HOANHAO','HH Street','teacher',1,'HH','user','example.com',1);
insert into lab_user 
    values('4','4','MALE','4@gmail.com', TO_DATE('02-NOV-02'),'0912321321','MGR','HCM','manager','1','SYSADM','admin','gg.com','1')
/* INSERT lab_dept DATA */

INSERT INTO lab_dept (location,name,manager_id,deleted) VALUES ('DEPARTMENT 1','Khoa May Tinh',1,1);
INSERT INTO lab_dept (location,name,manager_id,deleted) VALUES ('DEPARTMENT 2','Khoa May Tinh',1,1);
INSERT INTO lab_dept (location,name,manager_id,deleted) VALUES ('DEPARTMENT 3','Khoa May Tinh',2,1);

/* ADD CONSTRAINT */

ALTER TABLE lab_user ADD CONSTRAINT dept_fk FOREIGN KEY (dept_id) REFERENCES lab_dept(id);

/* INSERT lab_subject DATA */

INSERT INTO lab_subject (name,code,dept_id,deleted) VALUES ('BMHTTT','CO11',1,1);
INSERT INTO lab_subject (name,code,dept_id,deleted) VALUES ('MMVANM','CO12',2,1);
INSERT INTO lab_subject (name,code,dept_id,deleted) VALUES ('NLNNLT','CO13',3,1);

/* INSERT lab_class DATA */

INSERT INTO lab_class (name,student_number,semester,is_active,end_date,deleted) VALUES ('L01',30,'232','TRUE',TO_DATE('15-NOV-2023'),1);
INSERT INTO lab_class (name,student_number,semester,is_active,end_date,deleted) VALUES ('L02',35,'232','TRUE',TO_DATE('15-NOV-2023'),1);
INSERT INTO lab_class (name,student_number,semester,is_active,end_date,deleted) VALUES ('L03',40,'232','TRUE',TO_DATE('20-DEC-2023'),1);

/* INSERT lab_document DATA */

INSERT INTO lab_document (title,url,user_id,class_id,deleted) VALUES ('De Thi GK','example.com',1,2,1);
INSERT INTO lab_document (title,url,user_id,class_id,deleted) VALUES ('De Thi CK','example.com',1,1,1);
INSERT INTO lab_document (title,url,user_id,class_id,deleted) VALUES ('De BTL','example.com',2,2,1);

/* INSERT lab_learn DATA */

INSERT INTO lab_learn (subject_id,user_id,class_id,final_score,midterm_score,assignment_score,quiz_score,deleted) 
    VALUES (1,1,3,10,10,10,10,1);
INSERT INTO lab_learn (subject_id,user_id,class_id,final_score,midterm_score,assignment_score,quiz_score,deleted) 
    VALUES (1,2,1,10,10,10,10,1);
INSERT INTO lab_learn (subject_id,user_id,class_id,final_score,midterm_score,assignment_score,quiz_score,deleted) 
    VALUES (3,2,3,10,10,10,10,1);

/* INSERT lab_parent DATA */

INSERT INTO lab_parent (parent_id,student_id,deleted) VALUES (1,2,1);
INSERT INTO lab_parent (parent_id,student_id,deleted) VALUES (2,3,1);
INSERT INTO lab_parent (parent_id,student_id,deleted) VALUES (1,3,1);

/* INSERT lab_teach DATA */

INSERT INTO lab_teach (user_id,class_id,deleted) VALUES (1,1,1);
INSERT INTO lab_teach (user_id,class_id,deleted) VALUES (2,2,1);
INSERT INTO lab_teach (user_id,class_id,deleted) VALUES (3,3,1);

/* INSERT lab_notification DATA */

INSERT INTO lab_notification (mess_body,mess_header,send_date,user_id,class_id,deleted) 
    VALUES ('TEST', 'THIS IS A TEST NOTIFICATION',TO_DATE('15-NOV-2023'),1,2,1);
INSERT INTO lab_notification (mess_body,mess_header,send_date,user_id,class_id,deleted) 
    VALUES ('TEST', 'THIS IS A TEST NOTIFICATION',TO_DATE('15-NOV-2023'),1,3,1);
INSERT INTO lab_notification (mess_body,mess_header,send_date,user_id,class_id,deleted) 
    VALUES ('TEST', 'THIS IS A TEST NOTIFICATION',TO_DATE('15-NOV-2023'),2,3,1);

------------------------------
------------------------------
------------------------------
------------------------------
------------------------------

------------------------------
------------------------------
----------- POLICY -----------
------------------------------
------------------------------

/*********** APPLY OLS POLICY ***********/

BEGIN
    sa_policy_admin.apply_table_policy
        (policy_name => 'ACCESS_NOTIFICATION',
        schema_name => 'SYSADM',
        table_name => 'LAB_NOTIFICATION',
        table_options => 'NO_CONTROL');
END;
/

BEGIN
    sa_policy_admin.apply_table_policy
        (policy_name => 'ACCESS_DOCUMENT',
        schema_name => 'SYSADM',
        table_name => 'LAB_DOCUMENT',
        table_options => 'NO_CONTROL');
END;
/

UPDATE LAB_NOTIFICATION SET OLS_NOTI = char_to_label('ACCESS_NOTIFICATION', 'P');

UPDATE LAB_DOCUMENT SET OLS_DOC = char_to_label('ACCESS_DOCUMENT', 'P');

/*********** USER PASSWORD ***********/

ALTER PROFILE DEFAULT LIMIT
    PASSWORD_LIFE_TIME 60
    PASSWORD_REUSE_TIME 365 
    PASSWORD_REUSE_MAX 5
    FAILED_LOGIN_ATTEMPTS 3
    PASSWORD_VERIFY_FUNCTION ora12c_strong_verify_function;

/*********** CREATE ROLES ***********/

CREATE ROLE student;
CREATE ROLE parent;
CREATE ROLE teacher;
CREATE ROLE manager;

/*********** AUDITING ***********/

AUDIT DELETE ON lab_notification;
AUDIT INSERT,DELETE ON lab_learn;
AUDIT UPDATE,CREATE,DELETE ON lab_dept;
AUDIT UPDATE,CREATE,DELETE ON lab_subject;
AUDIT UPDATE,CREATE,DELETE ON lab_class;
AUDIT UPDATE,CREATE,DELETE ON lab_teach;

CONN SYS/test AS SYSDBA;
ALTER SESSION SET container = unipdb;
GRANT SELECT ON DBA_AUDIT_TRAIL TO manager;
CONN SYSADM/admin@localhost:1521/unipdb;

/*********** POLICY ***********/

/* POLICY FUNCTIONS */

CREATE OR REPLACE FUNCTION user_only (
    p_schema IN VARCHAR2 DEFAULT NULL,
    p_object IN VARCHAR2 DEFAULT NULL)
RETURN VARCHAR2
AS
BEGIN
    RETURN 'user_name = user';
END;
/

CREATE OR REPLACE FUNCTION user_active_only (
    p_schema IN VARCHAR2 DEFAULT NULL,
    p_object IN VARCHAR2 DEFAULT NULL)
RETURN VARCHAR2
AS
    user_id_query VARCHAR2(100);
    child_id_query VARCHAR2(100);
    teaching_query VARCHAR2(100);
    status_query VARCHAR2(100);   
    role_query VARCHAR2(100);   
    is_manager_query VARCHAR2(100);
    depts_query VARCHAR2(100);
    subject_query VARCHAR2(100);
BEGIN
    user_id_query := '(SELECT id FROM sysadm.lab_user WHERE user_name = user)';
    child_id_query := 'SELECT LISTAGG(student_id,'';'') FROM sysadm.lab_parent WHERE parent_id =';
    teaching_query := 'SELECT LISTAGG(UNIQUE class_id,'';'') FROM sysadm.lab_teach WHERE user_id =';
    status_query := '(SELECT is_active FROM sysadm.lab_class WHERE id = class_id)';
    role_query := '(SELECT role FROM sysadm.lab_user WHERE user_name = user)';
    is_manager_query := 'SELECT COUNT(*) FROM SYSADM.LAB_DEPT WHERE manager_id =';
    depts_query := 'SELECT id FROM SYSADM.LAB_DEPT WHERE manager_id =';
    subject_query := 'SELECT LISTAGG(id,'';'') FROM SYSADM.LAB_SUBJECT WHERE dept_id IN';
    
    RETURN
        ' deleted = ' ||
            ' CASE ' ||
                ' WHEN ( ' || is_manager_query || user_id_query || ' ) > 0 ' ||
                    ' THEN ( ' ||
                        ' CASE ' || 
                            ' WHEN INSTR(( ' || subject_query || ' ( ' || depts_query || user_id_query || ' )), TO_CHAR(subject_id)) > 0 ' ||
                                ' THEN 1 ' ||
                            ' ELSE 10 ' ||
                        ' END ' ||
                    ' ) ' ||
                ' WHEN ' || role_query || ' = ''teacher'' ' ||
                    ' THEN ( ' ||
                        ' CASE ' || 
                            ' WHEN INSTR(( ' || teaching_query || user_id_query || ' ), TO_CHAR(class_id)) > 0 ' ||
                                ' THEN 1 ' ||
                            ' ELSE 10 ' ||
                        ' END ' ||
                    ' ) ' ||
                ' WHEN ' || role_query || ' = ''parent'' ' ||
                    ' THEN ( ' ||
                        ' CASE ' || 
                            ' WHEN INSTR(( ' || child_id_query || user_id_query || ' ), TO_CHAR(user_id)) > 0 AND ' || status_query || ' = ''TRUE'' ' ||
                                ' THEN 1 ' ||
                            ' ELSE 10 ' ||
                        ' END ' ||
                    ' ) ' ||
                ' WHEN ' || role_query || ' = ''student'' ' ||
                    ' THEN ( ' ||
                        ' CASE ' || 
                            ' WHEN INSTR(TO_CHAR( ' || user_id_query || ' ), TO_CHAR(user_id)) > 0 AND ' || status_query || ' = ''TRUE'' ' ||
                                ' THEN 1 ' ||
                            ' ELSE 10 ' ||
                        ' END ' ||
                    ' ) ' ||
                ' ELSE 10 ' ||
            ' END ';
END;
/

CREATE OR REPLACE FUNCTION update_expired (
    p_schema IN VARCHAR2 DEFAULT NULL,
    p_object IN VARCHAR2 DEFAULT NULL)
RETURN VARCHAR2
AS
    curr_date VARCHAR2(100);
    end_date_query VARCHAR2(100);
    user_id_query VARCHAR2(100);
    teaching_query VARCHAR2(100);
    role_query VARCHAR2(100);   
    is_manager_query VARCHAR2(100);
BEGIN
    end_date_query := '(SELECT end_date FROM sysadm.lab_class WHERE id = class_id)';
    user_id_query := '(SELECT id FROM sysadm.lab_user WHERE user_name = user)';
    teaching_query := 'SELECT LISTAGG(UNIQUE class_id,'';'') FROM sysadm.lab_teach WHERE user_id =';
    role_query := '(SELECT role FROM sysadm.lab_user WHERE user_name = user)';
    is_manager_query := 'SELECT COUNT(*) FROM SYSADM.LAB_DEPT WHERE manager_id =';

    SELECT TO_CHAR(SYSDATE) INTO curr_date FROM DUAL;

    RETURN
        ' deleted = ' ||
            ' CASE ' ||
                ' WHEN ' || role_query || ' = ''teacher'' ' ||
                    ' THEN ( ' ||
                        ' CASE ' || 
                            ' WHEN INSTR(( ' || teaching_query || user_id_query || ' ), TO_CHAR(class_id)) > 0 AND ' || end_date_query || ' > TO_DATE(''' || curr_date ||''') ' ||
                                ' THEN 1 ' ||
                            ' ELSE 10 ' ||
                        ' END ' ||
                    ' ) ' ||
                ' ELSE 10 ' ||
            ' END ';
END;
/

CREATE OR REPLACE FUNCTION user_only_class (
    p_schema IN VARCHAR2 DEFAULT NULL,
    p_object IN VARCHAR2 DEFAULT NULL)
RETURN VARCHAR2
AS
    user_id_query VARCHAR2(100);
    class_ids_query VARCHAR2(100);
    teaching_query VARCHAR2(100);    
    semester_query VARCHAR2(100);
    role_query VARCHAR2(100);   
    curr_date VARCHAR2(100);
BEGIN
    user_id_query := '(SELECT id FROM sysadm.lab_user WHERE user_name = user)';
    class_ids_query := 'SELECT LISTAGG(UNIQUE class_id,'';'') FROM sysadm.lab_learn WHERE user_id =';
    teaching_query := 'SELECT LISTAGG(UNIQUE class_id,'';'') FROM sysadm.lab_teach WHERE user_id =';
    semester_query := '(SELECT semester FROM sysadm.lab_class WHERE id = class_id)';
    role_query := '(SELECT role FROM sysadm.lab_user WHERE user_name = user)';

    SELECT TO_CHAR(SYSDATE) INTO curr_date FROM DUAL;
    IF INSTR(curr_date, 'JAN') > 0 OR INSTR(curr_date, 'FEB') > 0 OR INSTR(curr_date, 'MAR') > 0 OR 
       INSTR(curr_date, 'APR') > 0 OR INSTR(curr_date, 'MAY') > 0 OR INSTR(curr_date, 'JUN') > 0 THEN
        curr_date := curr_date || '1';
    ELSE
        curr_date := curr_date || '2';
    END IF;

    RETURN
        ' deleted = ' ||
            ' CASE ' ||
                ' WHEN ' || role_query || ' = ''teacher'' ' ||
                    ' THEN ( ' ||
                        ' CASE ' || 
                            ' WHEN INSTR(( ' || teaching_query || user_id_query || ' ), TO_CHAR(class_id)) > 0 AND INSTR('' ' || curr_date || ' '', ' || semester_query || ' ) > 0 ' ||
                                ' THEN 1 ' ||
                            ' ELSE 10 ' ||
                        ' END ' ||
                    ' ) ' ||
                ' WHEN ' || role_query || ' = ''student'' ' ||
                    ' THEN ( ' ||
                        ' CASE ' || 
                            ' WHEN INSTR(( ' || class_ids_query || user_id_query || ' ), TO_CHAR(class_id)) > 0 ' ||
                                ' THEN 1 ' ||
                            ' ELSE 10 ' ||
                        ' END ' ||
                    ' ) ' ||
                ' ELSE 10 ' ||
            ' END ';
END;
/

CREATE OR REPLACE FUNCTION subject_only_dept (
    p_schema IN VARCHAR2 DEFAULT NULL,
    p_object IN VARCHAR2 DEFAULT NULL)
RETURN VARCHAR2
AS
    user_id_query VARCHAR2(100);
    role_query VARCHAR2(100);   
    is_manager_query VARCHAR2(100);   
    dept_query VARCHAR2(100);   
BEGIN
    user_id_query := '(SELECT id FROM sysadm.lab_user WHERE user_name = user)';
    role_query := '(SELECT role FROM sysadm.lab_user WHERE user_name = user)';
    is_manager_query := 'SELECT COUNT(*) FROM SYSADM.LAB_DEPT WHERE manager_id =';
    dept_query := 'SELECT LISTAGG(UNIQUE id,'';'') FROM SYSADM.LAB_DEPT WHERE manager_id =';

    RETURN
        ' deleted = ' ||
            ' CASE ' ||
                ' WHEN ( ' || is_manager_query || user_id_query || ' ) > 0 ' ||
                    ' THEN ( ' ||
                        ' CASE ' || 
                            ' WHEN INSTR(( ' || dept_query || user_id_query || ' ), TO_CHAR(dept_id)) > 0 ' ||
                                ' THEN 1 ' ||
                            ' ELSE 10 ' ||
                        ' END ' ||
                    ' ) ' ||
                ' ELSE 10 ' ||
            ' END ';
END;
/

/* TRIGGER FUNCTION */

CREATE OR REPLACE TRIGGER GRADE_STATE_TRIGGER 
    AFTER UPDATE ON sysadm.lab_learn 
FOR EACH ROW 
BEGIN
    UPDATE sysadm.lab_class
    SET is_active = 'FALSE'
    WHERE id = :new.class_id;
END;
/

CREATE OR REPLACE TRIGGER CLASS_STATE_TRIGGER 
    BEFORE UPDATE OF end_date ON sysadm.lab_class
FOR EACH ROW 
BEGIN
    :new.is_active := 'FALSE';
END;
/

/* POLICIES ENFORCEMENT */

BEGIN
    DBMS_RLS.add_policy
        (object_schema => 'SYSADM',
        object_name => 'lab_user',
        policy_name => 'user_only_policy',
        function_schema => 'SYSADM',
        policy_function => 'user_only',
        statement_types => 'SELECT',
        sec_relevant_cols => 'SSN,SEX,BIRTH,ADDRESS,ROLE,DEPT_ID,USER_NAME,PASSWORD,AVATAR,DELETED');
END;
/

BEGIN
    DBMS_RLS.add_policy
        (object_schema => 'SYSADM',
        object_name => 'lab_user',
        policy_name => 'update_user_only_policy',
        function_schema => 'SYSADM',
        policy_function => 'user_only',
        statement_types => 'UPDATE');
END;
/

BEGIN
    DBMS_RLS.add_policy
        (object_schema => 'SYSADM',
        object_name => 'lab_learn',
        policy_name => 'user_active_only_policy',
        function_schema => 'SYSADM',
        policy_function => 'user_active_only',
        statement_types => 'SELECT');
END;
/

BEGIN
    DBMS_RLS.add_policy
        (object_schema => 'SYSADM',
        object_name => 'lab_learn',
        policy_name => 'update_expired_policy',
        function_schema => 'SYSADM',
        policy_function => 'update_expired',
        statement_types => 'UPDATE');
END;
/

BEGIN
    DBMS_RLS.add_policy
        (object_schema => 'SYSADM',
        object_name => 'lab_document',
        policy_name => 'document_only_policy',
        function_schema => 'SYSADM',
        policy_function => 'user_only_class',
        statement_types => 'SELECT,UPDATE,DELETE,INSERT',
        update_check => TRUE);
END;
/

BEGIN
    DBMS_RLS.add_policy
        (object_schema => 'SYSADM',
        object_name => 'lab_notification',
        policy_name => 'notification_only_policy',
        function_schema => 'SYSADM',
        policy_function => 'user_only_class',
        statement_types => 'SELECT,UPDATE,DELETE,INSERT',
        update_check => TRUE);
END;
/

BEGIN
    DBMS_RLS.add_policy
        (object_schema => 'SYSADM',
        object_name => 'lab_subject',
        policy_name => 'subject_only_policy',
        function_schema => 'SYSADM',
        policy_function => 'subject_only_dept',
        statement_types => 'UPDATE,DELETE,INSERT',
        update_check => TRUE);
END;
/

/*********** GRANT PRIVILEGES STUDENT ***********/

GRANT CREATE SESSION TO student;

GRANT ALL PRIVILEGES ON sysadm.lab_user TO student;
REVOKE DELETE,INSERT,UPDATE ON sysadm.lab_user FROM student;
GRANT UPDATE(SEX,BIRTH,PHONE,ADDRESS) ON sysadm.lab_user TO student;
GRANT READ ON sysadm.lab_dept TO student;
GRANT READ ON sysadm.lab_subject TO student;
GRANT READ ON sysadm.lab_class TO student;
GRANT READ ON sysadm.lab_document TO student;
GRANT READ ON sysadm.lab_learn TO student;
GRANT READ ON sysadm.lab_parent TO student;
GRANT READ ON sysadm.lab_notification TO student;

/*********** GRANT PRIVILEGES PARENT ***********/

GRANT CREATE SESSION TO parent;

GRANT ALL PRIVILEGES ON sysadm.lab_user TO parent;
REVOKE DELETE,INSERT,UPDATE ON sysadm.lab_user FROM parent;
GRANT UPDATE(SEX,BIRTH,PHONE,ADDRESS) ON sysadm.lab_user TO parent;
GRANT READ ON sysadm.lab_dept TO parent;
GRANT READ ON sysadm.lab_subject TO parent;
GRANT READ ON sysadm.lab_class TO parent;
GRANT READ ON sysadm.lab_learn TO parent;
GRANT READ ON sysadm.lab_parent TO parent;

/*********** GRANT PRIVILEGES TEACHER ***********/

GRANT CREATE SESSION TO teacher;

GRANT ALL PRIVILEGES ON sysadm.lab_user TO teacher;
REVOKE DELETE,INSERT,UPDATE ON sysadm.lab_user FROM teacher;
GRANT UPDATE(SEX,BIRTH,PHONE,ADDRESS) ON sysadm.lab_user TO teacher;
GRANT READ ON sysadm.lab_dept TO teacher;
GRANT ALL PRIVILEGES ON sysadm.lab_subject TO teacher;
GRANT READ ON sysadm.lab_class TO teacher;
GRANT ALL PRIVILEGES ON sysadm.lab_document TO teacher;
GRANT ALL PRIVILEGES ON sysadm.lab_learn TO teacher;
REVOKE DELETE,INSERT,UPDATE ON sysadm.lab_learn FROM teacher;
GRANT UPDATE(final_score,midterm_score,assignment_score,quiz_score) ON sysadm.lab_learn TO teacher;
GRANT READ ON sysadm.lab_parent TO teacher;
GRANT READ ON sysadm.lab_teach TO teacher;
GRANT ALL PRIVILEGES ON sysadm.lab_notification TO teacher;

/*********** GRANT PRIVILEGES UNI_STAFF ***********/

GRANT CREATE SESSION TO manager;
GRANT EXEMPT ACCESS POLICY TO manager;

GRANT ALL PRIVILEGES ON sysadm.lab_user TO manager;
GRANT ALL PRIVILEGES ON sysadm.lab_dept TO manager;
GRANT ALL PRIVILEGES ON sysadm.lab_subject TO manager;
GRANT ALL PRIVILEGES ON sysadm.lab_class TO manager;
GRANT ALL PRIVILEGES ON sysadm.lab_document TO manager;
GRANT ALL PRIVILEGES ON sysadm.lab_learn TO manager;
REVOKE UPDATE ON sysadm.lab_learn FROM manager;
GRANT ALL PRIVILEGES ON sysadm.lab_parent TO manager;
GRANT ALL PRIVILEGES ON sysadm.lab_teach TO manager;
GRANT ALL PRIVILEGES ON sysadm.lab_notification TO manager;

