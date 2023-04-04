const queries = {
    ofGetAllEmployeesFromAllFilials: (sort = 'filial', order = 'DESC') => {
        return `SELECT *
                FROM (
                         (SELECT e.id,
                                 e.first_name,
                                 e.last_name,
                                 e.job_title,
                                 'Main Office'                                       as filial,
                                 e.sick_leave_days                                   as sick_leave_days_available,
                                 COUNT(CASE WHEN edo.type = 'Sick Leave' THEN 1 END) as sick_leave_days_used,
                                 e.vacation_days                                     as vacation_days_available,
                                 COUNT(CASE WHEN edo.type = 'Vacation' THEN 1 END)   as vacation_days_used
                          FROM employees e
                                   LEFT JOIN employees_day_offs edo ON e.id = edo.employee_id
                          GROUP BY e.id, e.first_name, e.last_name, e.job_title, e.sick_leave_days, e.vacation_days)
                         UNION
                         (SELECT e_t1.id,
                                 e_t1.first_name,
                                 e_t1.last_name,
                                 e_t1.job_title,
                                 'Typical filial 1'                                     as filial,
                                 e_t1.sick_leave_days                                   as sick_leave_days_available,
                                 COUNT(CASE WHEN edo_t1.type = 'Sick Leave' THEN 1 END) as sick_leave_days_used,
                                 e_t1.vacation_days                                     as vacation_days_available,
                                 COUNT(CASE WHEN edo_t1.type = 'Vacation' THEN 1 END)   as vacation_days_used
                          FROM OpenDataSource('MSOLEDBSQL',
                                              'Server=localhost,10001\\MSSQLSERVER;UID=elogin;PWD=p@sSw0rd').enterprise.dbo.employees e_t1
    LEFT JOIN OpenDataSource ('MSOLEDBSQL',
    'Server=localhost,10001\\MSSQLSERVER;UID=elogin;PWD=p@sSw0rd').enterprise.dbo.employees_day_offs edo_t1
                          ON e_t1.id = edo_t1.employee_id
                          GROUP BY e_t1.id, e_t1.first_name, e_t1.last_name, e_t1.job_title, e_t1.sick_leave_days, e_t1.vacation_days)
                         UNION
                         (
                             SELECT e_t2.id,
                                    e_t2.first_name,
                                    e_t2.last_name,
                                    e_t2.job_title,
                                    'Typical filial 2'                                     as filial,
                                    e_t2.sick_leave_days                                   as sick_leave_days_available,
                                    COUNT(CASE WHEN edo_t2.type = 'Sick Leave' THEN 1 END) as sick_leave_days_used,
                                    e_t2.vacation_days                                     as vacation_days_available,
                                    COUNT(CASE WHEN edo_t2.type = 'Vacation' THEN 1 END)   as vacation_days_used
                             FROM OpenDataSource('MSOLEDBSQL',
                                                 'Server=localhost,10002\\MSSQLSERVER;UID=elogin;PWD=p@sSw0rd').enterprise.dbo.employees e_t2
    LEFT JOIN OpenDataSource ('MSOLEDBSQL',
    'Server=localhost,10002\\MSSQLSERVER;UID=elogin;PWD=p@sSw0rd').enterprise.dbo.employees_day_offs edo_t2
                             ON e_t2.id = edo_t2.employee_id
                             GROUP BY e_t2.id, e_t2.first_name, e_t2.last_name, e_t2.job_title, e_t2.sick_leave_days, e_t2.vacation_days)
                         UNION
                         (SELECT e_s.id,
                                 e_s.first_name,
                                 e_s.last_name,
                                 e_s.job_title,
                                 'Special filial'                                      as filial,
                                 e_s.sick_leave_days                                   as sick_leave_days_available,
                                 COUNT(CASE WHEN edo_s.type = 'Sick Leave' THEN 1 END) as sick_leave_days_used,
                                 e_s.vacation_days                                     as vacation_days_available,
                                 COUNT(CASE WHEN edo_s.type = 'Vacation' THEN 1 END)   as vacation_days_used
                          FROM OpenDataSource('MSOLEDBSQL',
                                              'Server=localhost,10003\\MSSQLSERVER;UID=elogin;PWD=p@sSw0rd').enterprise.dbo.employees e_s
    LEFT JOIN OpenDataSource ('MSOLEDBSQL',
    'Server=localhost,10003\\MSSQLSERVER;UID=elogin;PWD=p@sSw0rd').enterprise.dbo.employees_day_offs edo_s
                          ON e_s.id = edo_s.employee_id
                          GROUP BY e_s.id, e_s.first_name, e_s.last_name, e_s.job_title, e_s.sick_leave_days, e_s.vacation_days)) as result
                ORDER BY ${sort} ${order}`;
    },
};

module.exports = queries;

