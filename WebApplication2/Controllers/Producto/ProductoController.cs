using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace WebApplication2.Controllers.Producto
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    { 
        private readonly string _connectionString;
        private IConfiguration Configuration;
        public ProductoController(IConfiguration _configuration)
        {
            Configuration = _configuration;
            _connectionString = Configuration.GetConnectionString("MainConnection");
        }

        [HttpGet]
        [Route("all")]
        public IActionResult All()
        {
            Responses result;

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();
                }
                catch (Exception ex)
                {
                    result = new Responses(1001, ex.ToString());
                    return BadRequest(result.Payback());
                }
                using (SqlCommand cmd = new SqlCommand("Crud_Producto", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@opcion", 4);

                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    DataSet setter = new DataSet();
                    try
                    {
                        adapter.Fill(setter, "tabla");
                        if (setter.Tables["tabla"] == null)
                        {
                            return BadRequest();
                        }
                    }
                    catch (Exception ex)
                    {
                        return BadRequest();
                    }

                    if (setter.Tables["tabla"].Rows.Count <= 0)
                    {
                        return BadRequest();
                    }

                    return Ok(setter.Tables["tabla"]);
                }
            }
        }

        [HttpPost]
        [Produces("application/json")]
        [Route("one")]
        public IActionResult One(JObject request)
        {
            Responses result;

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();
                }
                catch (Exception ex)
                {
                    result = new Responses(1001, ex.ToString());
                    return BadRequest(result.Payback());
                }

                int id_producto = Int32.Parse(request.GetValue("id_producto").ToString());

                using (SqlCommand cmd = new SqlCommand("Crud_Producto", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@opcion", 5);
                    cmd.Parameters.AddWithValue("@id_producto", id_producto);

                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    DataSet setter = new DataSet();

                    try
                    {
                        /*adapter.Fill(setter= los datos que se van a ingresar en la tabla, "tabla"= nombre que se le da a la tabla*/
                        adapter.Fill(setter, "tabla");
                        if (setter.Tables["tabla"] == null)
                        {
                            result = new Responses(7001, null);
                            return BadRequest(result.Payback());
                        }
                    }
                    catch (Exception ex)
                    {
                        result = new Responses(1002, ex.ToString());
                        return BadRequest(result.Payback());
                    }

                    if (setter.Tables["tabla"].Rows.Count <= 0)
                    {
                        result = new Responses(2009, null);
                        return BadRequest(result.Payback());
                    }

                    return Ok(setter.Tables["tabla"]);
                }
            }
        }

        [HttpPost]
        [Route("store")]
        public IActionResult Store(JObject request)
        {
            Responses result;

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();
                }
                catch (Exception ex)
                {
                    result = new Responses(1001, ex.ToString());
                    return BadRequest(result.Payback());
                }

                string nombre = request.GetValue("nombre").ToString();
                string precio = request.GetValue("precio").ToString();
                string cantidad = request.GetValue("cantidad").ToString();
                string usuario = request.GetValue("usuario").ToString();

                using (SqlCommand cmd = new SqlCommand("Crud_Producto", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@opcion", 1);
                    cmd.Parameters.AddWithValue("@nombre", nombre);
                    cmd.Parameters.AddWithValue("@precio", precio);
                    cmd.Parameters.AddWithValue("@cantidad", cantidad);
                    cmd.Parameters.AddWithValue("@usuario", usuario);

                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    DataSet setter = new DataSet();

                    try
                    {
                        adapter.Fill(setter, "tabla");
                        if (setter.Tables["tabla"] == null)
                        {
                            result = new Responses(7001, null);
                            return BadRequest(result.Payback());

                        }

                    }
                    catch (Exception ex)
                    {
                        result = new Responses(1002, ex.ToString());
                        return BadRequest(result.Payback());
                    }
                    if (setter.Tables["tabla"].Rows.Count <= 0)
                    {
                        result = new Responses(2009, null);
                        return BadRequest(result.Payback());
                    }

                    dynamic resultado = new JObject();
                    resultado.response = 1;
                    resultado.message = "Producto agregado con éxito.";
                    resultado.value = 1;

                    return Ok(resultado);
                }
            }

        }

        [HttpPost]
        [Route("update")]
        //[Authorize]
        public IActionResult Update(JObject request)
        {
            Responses result;

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();
                }
                catch (Exception ex)
                {
                    result = new Responses(1001, ex.ToString());
                    return BadRequest(result.Payback());
                }

                int id_producto = Int32.Parse(request.GetValue("id_producto").ToString());
                string nombre = request.GetValue("nombre").ToString();
                decimal precio = decimal.Parse(request.GetValue("precio").ToString());
                int cantidad = Int32.Parse(request.GetValue("cantidad").ToString());
                string usuario = request.GetValue("usuario").ToString();

                using (SqlCommand cmd = new SqlCommand("dbo.Crud_Producto", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@opcion", 2);
                    cmd.Parameters.AddWithValue("@id_producto", id_producto);
                    cmd.Parameters.AddWithValue("@nombre", nombre is null ? DBNull.Value: nombre);
                    cmd.Parameters.AddWithValue("@precio", precio ==0 ? DBNull.Value: precio);
                    cmd.Parameters.AddWithValue("@cantidad", cantidad ==0 ? DBNull.Value: cantidad);
                    cmd.Parameters.AddWithValue("@usuario", usuario);
                    cmd.ExecuteNonQuery();

                    dynamic resultado = new JObject();
                    resultado.response = 1;
                    resultado.message = "Producto actualizado con éxito.";
                    resultado.value = 1;

                    return Ok(resultado);
                }
            }
        }

        [HttpPost]
        [Route("destroy")]
        //[Authorize]
        public IActionResult Destroy(JObject request)
        {
            Responses result;

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();
                }
                catch (Exception ex)
                {
                    result = new Responses(1001, ex.ToString());
                    return BadRequest(result.Payback());
                }

                int id_producto = Int32.Parse(request.GetValue("id_producto").ToString());
                string usuario = request.GetValue("usuario").ToString();

                using (SqlCommand cmd = new SqlCommand("Crud_Producto", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@opcion", 3);
                    cmd.Parameters.AddWithValue("@id_producto", id_producto);
                    cmd.Parameters.AddWithValue("@existencia", 0);
                    cmd.Parameters.AddWithValue("@usuario", usuario);
                    cmd.ExecuteNonQuery();

                    dynamic resultado = new JObject();
                    resultado.response = 1;
                    resultado.message = "Producto se ha dado de baja con éxito.";
                    resultado.value = 1;

                    return Ok(resultado);
                }
            }
        }

        [HttpPost]
        [Route("active")]
        //[Authorize]
        public IActionResult Active(JObject request)
        {
            Responses result;

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();
                }
                catch (Exception ex)
                {
                    result = new Responses(1001, ex.ToString());
                    return BadRequest(result.Payback());
                }

                int id_producto = Int32.Parse(request.GetValue("id_producto").ToString());
                string usuario = request.GetValue("usuario").ToString();

                using (SqlCommand cmd = new SqlCommand("Crud_Producto", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@opcion", 3);
                    cmd.Parameters.AddWithValue("@id_producto", id_producto);
                    cmd.Parameters.AddWithValue("@existencia", 1);
                    cmd.Parameters.AddWithValue("@usuario", usuario);
                    cmd.ExecuteNonQuery();

                    dynamic resultado = new JObject();
                    resultado.response = 1;
                    resultado.message = "Producto se ha dado de alta con éxito.";
                    resultado.value = 1;

                    return Ok(resultado);
                }
            }
        }


        [HttpGet]
        [Produces("application/json")]
        [Route("label")]
        //[Authorize]
        public IActionResult GetAllLabel()
        {
            Responses result;
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    try
                    {
                        conn.Open();
                    }
                    catch (Exception ex)
                    {
                        result = new Responses(1001, ex.ToString());
                        return BadRequest(result.Payback());
                    }
                    using (SqlCommand cmd = new SqlCommand("dbo.Crud_Producto", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("opcion", 6);
                        SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                        DataSet setter = new DataSet();
                        try
                        {
                            adapter.Fill(setter, "tabla");
                            if (setter.Tables["tabla"] == null)
                            {
                                result = new Responses(7001, null);
                                return BadRequest(result.Payback());
                            }
                        }
                        catch (Exception ex)
                        {
                            result = new Responses(1003, ex.ToString());
                            return BadRequest(result.Payback());
                        }
                        if (setter.Tables["tabla"].Rows.Count <= 0)
                        {
                            result = new Responses(2009, null);
                            return BadRequest(result.Payback());
                        }
                        return Ok(setter.Tables["tabla"]);
                    }
                }
            }
            catch (Exception ex)
            {
                result = new Responses(1003, ex.ToString());
                return BadRequest(result.Payback());
            }
        }
    }
    }

