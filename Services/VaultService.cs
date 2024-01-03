using System;
using System.Collections.Generic;
using Listr.Models;
using Listr.Repositories;

namespace Listr.Services
{
  public class VaultService : BaseApiService<Vault>
  {
    private VaultRepository _vaultRepo;
    public VaultService(VaultRepository repo) : base(repo)
    {
      _vaultRepo = repo;
    }

    public Keep AddKeepToVault(VaultKeepMap vkm)
    {
      return _vaultRepo.AddKeepToVault(vkm);
    }

    public IEnumerable<Keep> GetKeepsByVaultId(int vaultId)
    {
      return _vaultRepo.GetKeepsByVaultId(vaultId);
    }

    public override IEnumerable<Vault> GetByUserId(string userId)
    {
      return _vaultRepo.GetByUserId(userId);
    }

    internal void RemoveKeepFromVault(int vaultId, int keepId)
    {
      _vaultRepo.RemoveKeepFromVault(vaultId, keepId);
    }
  }
}