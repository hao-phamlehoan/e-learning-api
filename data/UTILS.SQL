------------------------------
------------------------------
----------- UTILS ------------
------------------------------
------------------------------

/*********** DROP TABLES ***********/

DROP TABLE lab_user CASCADE CONSTRAINT;
DROP TABLE lab_dept CASCADE CONSTRAINT;
DROP TABLE lab_subject CASCADE CONSTRAINT;
DROP TABLE lab_class CASCADE CONSTRAINT;
DROP TABLE lab_document CASCADE CONSTRAINT;
DROP TABLE lab_learn CASCADE CONSTRAINT;
DROP TABLE lab_parent CASCADE CONSTRAINT;
DROP TABLE lab_teach CASCADE CONSTRAINT;
DROP TABLE lab_notification CASCADE CONSTRAINT;

/********** DROP PDB **********/

ALTER PLUGGABLE DATABASE unipdb CLOSE;

DROP PLUGGABLE DATABASE unipdb INCLUDING DATAFILES;

/********** OPEN PDB **********/

ALTER PLUGGABLE DATABASE unipdb OPEN;

/********** CREATE USER **********/

CREATE USER HH IDENTIFIED BY HHhh$$123;

GRANT TEACHER TO HH;

/********** DBA_AUDIT_TRAIL QUERY **********/

SELECT USERNAME, TIMESTAMP, OBJ_NAME, ACTION_NAME FROM DBA_AUDIT_TRAIL;

SELECT * FROM DBA_AUDIT_TRAIL;

/********** ASSIGN LEVEL FOR STUDENT AND PARENT **********/

CONN SYSADM/admin@localhost:1521/unipdb;

BEGIN
    sa_user_admin.set_levels
        (policy_name => 'ACCESS_NOTIFICATION',
        user_name => 'ABC',
        max_level => 'P',
        min_level => 'P',
        def_level => 'P',
        row_level => 'P');
END;
/

BEGIN
    sa_user_admin.set_levels
        (policy_name => 'ACCESS_DOCUMENT',
        user_name => 'ABC',
        max_level => 'P',
        min_level => 'P',
        def_level => 'P',
        row_level => 'P');
END;
/

/********** ASSIGN LEVEL FOR TEACHER **********/

CONN SYSADM/admin@localhost:1521/unipdb;

BEGIN
    sa_user_admin.set_levels
        (policy_name => 'ACCESS_NOTIFICATION',
        user_name => 'ABC',
        max_level => 'C',
        min_level => 'P',
        def_level => 'C',
        row_level => 'C');
END;
/

BEGIN
    sa_user_admin.set_levels
        (policy_name => 'ACCESS_DOCUMENT',
        user_name => 'ABC',
        max_level => 'C',
        min_level => 'P',
        def_level => 'C',
        row_level => 'C');
END;
/

/********** ASSIGN LEVEL FOR MANAGER **********/

CONN SYSADM/admin@localhost:1521/unipdb;

BEGIN
    sa_user_admin.set_levels
        (policy_name => 'ACCESS_NOTIFICATION',
        user_name => 'ABC',
        max_level => 'S',
        min_level => 'P',
        def_level => 'S',
        row_level => 'S');
END;
/

BEGIN
    sa_user_admin.set_levels
        (policy_name => 'ACCESS_DOCUMENT',
        user_name => 'ABC',
        max_level => 'S',
        min_level => 'P',
        def_level => 'S',
        row_level => 'S');
END;
/

/********** ASSIGN OLS LEVEL **********/

INSERT INTO lab_document (title,url,user_id,class_id,deleted,ols_doc) VALUES ('De Thi GK','example.com',2,3,1,char_to_label('ACCESS_DOCUMENT', 'P'));
