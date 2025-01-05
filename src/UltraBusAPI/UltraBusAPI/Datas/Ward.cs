using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace UltraBusAPI.Datas
{
    public class Ward
    {
        [Key]
        public int Id { get; set; }

        [AllowNull]
        public string? Name { get; set; }

        [AllowNull]
        public string? NameEnglish { get; set; }

        [AllowNull]
        public string? FullName { get; set; }

        [AllowNull]
        public string? FullNameEnglish { get; set; }

        [AllowNull]
        public double? Latitude { get; set; }

        [AllowNull]
        public double? Longitude { get; set; }

        [Required]
        public int? DistrictId { get; set; }
        public District? District { get; set; } = null;

        public ICollection<User>? Users { get; set; } = null;

        public ICollection<BusStation>? BusStations { get; set; } = null;

    }
}
