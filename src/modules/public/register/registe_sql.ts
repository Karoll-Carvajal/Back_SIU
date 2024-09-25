export const ACCESS_SQL = {
    SESSION_DATA: "SELECT u.cod_user, u.name_user , u.phone_user,\
    (SELECT name_role FROM roles WHERE cod_role=u.cod_role ) as name_role, a.name_access \
    FROM access a INNER JOIN users u ON u.cod_user=a.cod_user WHERE a.cod_user=$1"
}