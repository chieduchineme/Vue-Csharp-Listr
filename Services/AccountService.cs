using System;
using Listr.Repositories;
using Listr.Models;

namespace Listr
{
  public class AccountService
  {
    private readonly AccountRepository _repo;

    public User Register(UserRegistration creds)
    {
      User user = new User();
      user.user_id = Guid.NewGuid().ToString();
      user.user_email = creds.user_email;
      user.user_username = creds.user_username;
      user.user_hash = BCrypt.Net.BCrypt.HashPassword(creds.user_password);

      _repo.Register(user);
      return user;
    }

    public User SignIn(UserSignIn creds)
    {
      User user = _repo.GetUserByEmail(creds.user_email);
      if (user == null || !BCrypt.Net.BCrypt.Verify(creds.user_password, user.user_hash))
      {
        throw new Exception("Invalid Email or Password");
      }
      user.user_hash = null;
      return user;
    }

    public User GetUserById(string Id)
    {
      User user = _repo.GetUserById(Id);
      if (user == null) { throw new Exception("Invalid Request"); }
      user.user_hash = null;
      return user;
    }

    public AccountService(AccountRepository repo)
    {
      _repo = repo;
    }
  }
}