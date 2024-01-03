using System.Collections.Generic;
using System.Data;
using Dapper;

using System.Reflection;
using System;

namespace Listr.Repositories
{
  public abstract class BaseApiRepository<T>
  {
    private readonly IDbConnection _db;
    private readonly string _table;
    public BaseApiRepository(IDbConnection db, string tablename)
    {
      _db = db;
      _table = tablename;
    }

    private string GetUpdateSql(int entity_id)
    {
      IEnumerable<PropertyInfo> propertyInfoArray = typeof(T).GetTypeInfo().DeclaredProperties;
      string id_column = _table + "_id";
      bool first = true;
      string result = $"update `{_table}` set";

      foreach (PropertyInfo propertyInfo in propertyInfoArray)
      {
        string column_name = propertyInfo.Name;

        if (column_name == id_column)
        {
          continue;
        }

        if ((column_name != "user_id") && (column_name.Substring(0, 4) == "user"))
        {
          continue;
        }


        if (column_name == "vault_keep_count")
        {
          continue;
        }

        if (first)
        {
          result += $" `{column_name}` = @{column_name}";
          first = false;
        }
        else
        {
          result += $", `{column_name}` = @{column_name}";
        }
      }

      result += $" where `{id_column}` = {entity_id};";
      result += $"select * from {_table} where `{id_column}` = {entity_id};";

      return result;
    }

    internal void Delete(int id)
    {
      string sql = $"delete from {_table} where {_table}_id = @id;";
      _db.Execute(sql, new { id });
    }

    internal string GetCreateSql(string user_id)
    {
      IEnumerable<PropertyInfo> propertyInfoArray = typeof(T).GetTypeInfo().DeclaredProperties;
      string id_column = _table + "_id";
      bool first = true;
      string columns = "";
      string values = "";

      foreach (PropertyInfo propertyInfo in propertyInfoArray)
      {
        string column_name = propertyInfo.Name;

        if (column_name == id_column)
        {
          continue;
        }

        if ((column_name != "user_id") && (column_name.Substring(0, 4) == "user"))
        {
          continue;
        }

        if (column_name == "vault_keep_count")
        {
          continue;
        }

        if (first)
        {
          columns += $"`{column_name}`";

          values += column_name == "user_id" ? $"'{user_id}'" : $"@{column_name}";
          //   values += $"@{column_name}";
          first = false;
        }
        else
        {
          columns += $", `{column_name}`";
          values += column_name == "user_id" ? $", '{user_id}'" : $", @{column_name}";
          //   values += $", @{column_name}";
        }
      }

      string result = $"insert into `{_table}` ({columns}) values ({values});";
      result += "select last_insert_id();";

      return result;
    }

    public virtual IEnumerable<T> GetByUserId(string userId)
    {
      string sql = $"SELECT * FROM {_table} a left join user b on a.user_id = b.user_id  WHERE a.user_id = @userId;";
      return _db.Query<T>(sql, new { userId });
    }

    public IEnumerable<T> Get()
    {
      string sql = $"SELECT * FROM {_table}  a left join user b on a.user_id = b.user_id  ;";
      IEnumerable<T> result = _db.Query<T>(sql);
      return result;
      // return _db.Query<T>(sql);
    }
    public T Get(int id)
    {
      string sql = $"SELECT * FROM {_table} a left join user b on a.user_id = b.user_id WHERE {_table}_id = @id";
      return _db.QueryFirstOrDefault<T>(sql, new { id });
    }

    public int Create(T data, string user_id)
    {
      string sql = GetCreateSql(user_id);
      return _db.ExecuteScalar<int>(sql, data);
    }

    public T Edit(T data, int id)
    {
      string sql = GetUpdateSql(id);
      return _db.QueryFirstOrDefault<T>(sql, data);
    }
  }
}