using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Listr.Services;
using System.Security.Claims;
using Newtonsoft.Json;
using System.Linq;

namespace Listr.Controllers
{
  [ApiController]
  public abstract class BaseApiController<T> : ControllerBase
  {
    public readonly BaseApiService<T> _service;
    public BaseApiController(BaseApiService<T> service)
    {
      _service = service;
    }

    [HttpGet]
    public virtual ActionResult<IEnumerable<T>> Get()
    {
      try
      {
        return Ok(_service.Get());
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("user")]
    public virtual ActionResult<IEnumerable<T>> GetByLoggedInUser()
    {
      string userId = HttpContext.User.FindFirstValue("user_id");
      try
      {
        return Ok(_service.GetByUserId(userId));
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("user/{id}")]
    public virtual ActionResult<IEnumerable<T>> GetByUserId(string id)
    {
      try
      {
        return Ok(_service.GetByUserId(id));
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{id}")]
    public virtual ActionResult<T> Get(int id)
    {
      try
      {
        return Ok(_service.Get(id));
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    // [Authorize]
    [HttpPost]
    public virtual ActionResult<T> Create([FromBody] T data) //[FromBody] T data
    {
      try
      {
        string user_id = HttpContext.User.FindFirstValue("user_id");
        return Ok(_service.Create(data, user_id));
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    // [Authorize]
    [HttpPut("{id}")]
    public virtual ActionResult<T> Edit([FromBody] T data, int id)
    {
      try
      {
        return Ok(_service.Edit(data, id));
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    // [Authorize]
    [HttpDelete("{id}")]
    public virtual ActionResult<Boolean> Delete(int id)
    {
      try
      {
        _service.Delete(id);
        return Ok(true);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}

