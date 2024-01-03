using System.ComponentModel.DataAnnotations;

namespace Listr.Models
{
  public class Vault
  {
    public int vault_id { get; set; }
    [Required]
    public string vault_name { get; set; }
    [Required]
    public string vault_description { get; set; }
    [Required]
    public string user_id { get; set; }

    public int vault_keep_count {get; set;}
  }
}