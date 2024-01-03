using System.ComponentModel.DataAnnotations;

namespace Listr.Models
{
  public class Keep
  {
    public int keep_id { get; set; }

    public string user_id { get; set; }

    public string keep_name { get; set; }

    public string keep_description { get; set; }

    public string keep_img_url { get; set; }

    public bool keep_is_public { get; set; } = false;

    public int keep_view_count { get; set; } = 0;

    public int keep_share_count { get; set; } = 0;

    public int keep_keep_count { get; set; } = 0;

    public string user_username { get; set; }

    public string user_img_url {get; set;}

    public string user_color {get; set;}
  }
}