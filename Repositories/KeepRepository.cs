using System;
using System.Data;
using Dapper;
using Listr.Models;

namespace Listr.Repositories
{
  public class KeepRepository : BaseApiRepository<Keep>
  {
    private IDbConnection _keepDb;
    public KeepRepository(IDbConnection db) : base(db, "keep")
    {
      _keepDb = db;
    }

    internal Keep ViewKeep(int keepId)
    {
      string sql = $"call ViewKeep(@keepId);";
      return _keepDb.QueryFirst<Keep>(sql, new { keepId });
    }
  }
}