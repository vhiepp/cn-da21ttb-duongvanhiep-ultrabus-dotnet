using Microsoft.AspNetCore.Mvc;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/provinces")]
    [ApiController]
    public class ProvinceController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public ProvinceController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var provinces = await _addressService.GetAllProvince();

            return Ok(new ApiResponse()
            {
                Success = true,
                Data = provinces,
                Message = "Get all provinces successfully"
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var province = await _addressService.GetProvinceById(id);

            return Ok(new ApiResponse()
            {
                Success = true,
                Data = province,
                Message = "Get province by id successfully"
            });
        }

        [HttpGet("{id}/districts")]
        public async Task<IActionResult> GetDistrictsByProvinceId(int id)
        {
            var districts = await _addressService.GetDistrictByProvinceId(id);

            return Ok(new ApiResponse()
            {
                Success = true,
                Data = districts,
                Message = "Get districts by province id successfully"
            });
        }
    }

    [Route("api/districts")]
    [ApiController]
    public class DistrictController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public DistrictController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpGet("{districtId}")]  
        public async Task<IActionResult> GetByDistrictId(int districtId)
        {
            var district = await _addressService.GetDistrictById(districtId);

            return Ok(new ApiResponse()
            {
                Success = true,
                Data = district,
                Message = "Get district by Id successfully"
            });
        }

        [HttpGet("{districtId}/wards")]
        public async Task<IActionResult> GetWardsByDistrictId(int districtId)
        {
            var wards = await _addressService.GetWardByDistrictId(districtId);

            return Ok(new ApiResponse()
            {
                Success = true,
                Data = wards,
                Message = "Get wards by district id successfully"
            });
        }
    }

    [Route("api/wards")]
    [ApiController]
    public class WardController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public WardController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpGet("{districtId}")]
        public async Task<IActionResult> GetByDistrictId(int districtId)
        {
            var wards = await _addressService.GetWardByDistrictId(districtId);

            return Ok(new ApiResponse()
            {
                Success = true,
                Data = wards,
                Message = "Get wards by district id successfully"
            });
        }
    }
}
