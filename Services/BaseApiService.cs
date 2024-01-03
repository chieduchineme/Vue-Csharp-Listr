using System;
using System.Collections.Generic;
using Listr.Repositories;

namespace Listr.Services
{
  public abstract class BaseApiService<T>
  {
    private readonly BaseApiRepository<T> _repo;
    public BaseApiService(BaseApiRepository<T> repo)
    {
      _repo = repo;
    }

    public virtual IEnumerable<T> Get()
    {
      return _repo.Get();
    }

    public virtual IEnumerable<T> GetByUserId(string userId)
    {
      return _repo.GetByUserId(userId);
    }

    public virtual T Get(int id)
    {
      T exists = _repo.Get(id);
      if (exists == null) { throw new Exception("Invalid Id"); }
      return exists;
    }

    public virtual int Create(T data, string user_id)
    {
      return _repo.Create(data, user_id);
    }

    public virtual T Edit(T data, int id)
    {
      // Need to change tablename_id to id
      return _repo.Edit(data, id);
    }

    internal void Delete(int id)
    {
      _repo.Delete(id);
    }
  }
}