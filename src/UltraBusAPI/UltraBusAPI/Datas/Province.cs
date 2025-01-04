using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace UltraBusAPI.Datas
{
    public class Province
    {
        [Key]
        public int Id { get; set; }

        [AllowNull]
        public string? Name { get; set; } = null;

        [AllowNull]
        public string? NameEnglish { get; set; } = null;

        [AllowNull]
        public string? FullName { get; set; } = null;

        [AllowNull]
        public string? FullNameEnglish { get; set; } = null;

        [AllowNull]
        public double? Latitude { get; set; } = null;

        [AllowNull]
        public double? Longitude { get; set; } = null;

        public ICollection<District>? Districts { get; set; } = null;

        public ICollection<User>? Users { get; set; } = null;

        public ICollection<BusStation>? BusStations { get; set; } = null;
    }
}
