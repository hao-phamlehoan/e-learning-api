CREATE TABLE USER_ (
    ID NUMBER PRIMARY KEY,
    ssn VARCHAR2(20) UNIQUE,
    sex VARCHAR2(3),
    email VARCHAR2(50),
    birth DATE,
    phone VARCHAR(12),
    name VARCHAR(50),
    address VARCHAR(100),
    role VARCHAR(50),
    DEPT_ID NUMBER,
    DELETED NUMBER(1) DEFAULT 0
);

CREATE TABLE DEPT (
    ID NUMBER PRIMARY KEY,
    location VARCHAR2(256),
    name VARCHAR2(256),
    MANAGER_ID NUMBER,
    FOREIGN KEY (MANAGER_ID) REFERENCES USER_(ID),
    DELETED NUMBER(1) DEFAULT 0
);

ALTER TABLE USER_
ADD CONSTRAINT DEPT_FK FOREIGN KEY (DEPT_ID) REFERENCES DEPT(ID);

ALTER TABLE USER_
ADD CONSTRAINT Check_sex
CHECK (sex IN ('nam', 'nữ'));

ALTER TABLE USER_
ADD CONSTRAINT Check_role
CHECK (role IN ('admin', 'student', 'teacher', 'manager'));

CREATE TABLE ACCOUNT_ (
    ID NUMBER PRIMARY KEY,
    NAME VARCHAR2(100),
    PASSWORD VARCHAR(50),
    AVATAR VARCHAR2(256),
    FOREIGN KEY (ID) REFERENCES USER_(ID),
    DELETED NUMBER(1) DEFAULT 0
);

CREATE TABLE PARENT (
    PARENT_ID NUMBER,
    STUDENT_ID NUMBER,
    PRIMARY KEY (PARENT_ID, STUDENT_ID),
    FOREIGN KEY (PARENT_ID) REFERENCES USER_(ID),
    FOREIGN KEY (STUDENT_ID) REFERENCES USER_(ID),
    DELETED NUMBER(1) DEFAULT 0
);

CREATE TABLE TEACH (
    USER_ID NUMBER,
    CLASS_ID NUMBER,
    PRIMARY KEY (USER_ID, CLASS_ID),
    FOREIGN KEY (USER_ID) REFERENCES USER_(ID),
    FOREIGN KEY (CLASS_ID) REFERENCES CLASS_(ID),
    DELETED NUMBER(1) DEFAULT 0
);

CREATE TABLE CLASS_ (
    ID NUMBER PRIMARY KEY,
    NAME VARCHAR2(256),
    STUDENT_NUMBER NUMBER,
    DELETED NUMBER(1) DEFAULT 0
);

CREATE TABLE SUBJECT_ (
    ID NUMBER PRIMARY KEY,
    name VARCHAR2(256),
    code VARCHAR2(256),
    DEPT_ID NUMBER,
    FOREIGN KEY (DEPT_ID) REFERENCES DEPT(ID),
    DELETED NUMBER(1) DEFAULT 0
);

CREATE TABLE LEARN (
    SUBJECT_ID NUMBER,
    USER_ID NUMBER,
    CLASS_ID NUMBER,
    FINAL_SCORE FLOAT,
    MIDTERN_SCORE FLOAT,
    ASSIGNMENT_SCORE FLOAT,
    QUIZ_SCORE FLOAT,
    STATUS VARCHAR2(20),
    SEMESTER_NAME VARCHAR(50),
    END_DATE DATE, 
    PRIMARY KEY (SUBJECT_ID, USER_ID, CLASS_ID),
    FOREIGN KEY (USER_ID) REFERENCES USER_(ID),
    FOREIGN KEY (CLASS_ID) REFERENCES CLASS_(ID),
    FOREIGN KEY (SUBJECT_ID) REFERENCES SUBJECT_(ID),
    DELETED NUMBER(1) DEFAULT 0
);

CREATE TABLE NOTIFI (
    ID NUMBER PRIMARY KEY,
    MESS_BODY VARCHAR2(256),
    MESS_HEADER VARCHAR2(256),
    SEND_DATE DATE,
    USER_ID NUMBER,
    CLASS_ID NUMBER,
    FOREIGN KEY (USER_ID) REFERENCES USER_(ID),
    FOREIGN KEY (CLASS_ID) REFERENCES CLASS_(ID),
    DELETED NUMBER(1) DEFAULT 0
);

CREATE TABLE DOCUMENT_ (
    ID NUMBER PRIMARY KEY,
    TITLE VARCHAR2(256),
    URL VARCHAR2(256),
    USER_ID NUMBER,
    CLASS_ID NUMBER,
    FOREIGN KEY (USER_ID) REFERENCES USER_(ID),
    FOREIGN KEY (CLASS_ID) REFERENCES CLASS_(ID),
    DELETED NUMBER(1) DEFAULT 0
);