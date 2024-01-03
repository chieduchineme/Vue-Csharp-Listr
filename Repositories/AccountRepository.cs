using System.Data;
using Dapper;
using Listr.Models;

namespace Listr.Repositories
{
  public class AccountRepository
  {

    IDbConnection _db;

    //REGISTER
    public void Register(User user)
    {
      //generate the user user_id
      //HASH THE PASSWORD
      string sql = @"
                INSERT INTO user 
                (user_id, user_username, user_email, user_hash)
                VALUES 
                (@user_id, @user_username, @user_email, @user_hash)";
      _db.Execute(sql, user);
    }

    internal User GetUserByEmail(string user_email)
    {
      string sql = "SELECT * FROM user WHERE user_email = @user_email";
      return _db.QueryFirstOrDefault<User>(sql, new { user_email });
    }

    internal User GetUserById(string user_id)
    {
      string sql = "SELECT * FROM user WHERE user_id = @user_id";
      return _db.QueryFirstOrDefault<User>(sql, new { user_id });
    }

    public AccountRepository(IDbConnection db)
    {
      _db = db;
    }

  }
}