using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace Listr.Models
{

  public class UserSignIn // HELPER MODEL
  {
    [Required]
    [EmailAddress]
    public string user_email { get; set; }

    [Required]
    [MinLength(6)]
    public string user_password { get; set; }
  }
  public class UserRegistration // HELPER MODEL
  {

    [Required]
    public string user_username { get; set; }

    [Required]
    [EmailAddress]
    public string user_email { get; set; }

    [Required]
    [MinLength(6)]
    public string user_password { get; set; }
  }

  public class User
  {
    public string user_id { get; set; }
    public string user_username { get; set; }
    [EmailAddress]
    public string user_email { get; set; }
    public string user_img_url { get; set; }
    public string user_hash { get; set; }
    internal ClaimsPrincipal _principal { get; private set; }

    internal void SetClaims()
    {
      var claims = new List<Claim>
            {
                new Claim("user_id", user_id), //req.session.uid = id
                new Claim(ClaimTypes.Email, user_email),
                new Claim(ClaimTypes.Name, user_username)
            };
      var userIdentity = new ClaimsIdentity(claims, "login");
      _principal = new ClaimsPrincipal(userIdentity);
    }
  }
}