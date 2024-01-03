using System.ComponentModel.DataAnnotations;

namespace Listr.Models
{
  public class VaultKeepMap
  {
    [Required]
    public int vault_id {get; set;}
    
    [Required]
    public int keep_id {get; set;}

    public string user_id {get; set;}
  }
}