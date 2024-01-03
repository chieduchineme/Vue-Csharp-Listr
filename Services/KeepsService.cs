using System;
using Listr.Models;
using Listr.Repositories;

namespace Listr.Services
{
  public class KeepsService : BaseApiService<Keep>
  {
    private KeepRepository _keepRepo;
    public KeepsService(KeepRepository repo) : base(repo)
    {
      _keepRepo = repo;
    }

    internal Keep ViewKeep(int keepId)
    {
      return _keepRepo.ViewKeep(keepId);
    }
  }
}