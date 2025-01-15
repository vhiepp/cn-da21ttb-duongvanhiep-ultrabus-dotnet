using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UltraBusAPI.Migrations
{
    /// <inheritdoc />
    public partial class addProvinceIdInBusRoute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProvinceEndStationId",
                table: "BusRoutes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProvinceStartStationId",
                table: "BusRoutes",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProvinceEndStationId",
                table: "BusRoutes");

            migrationBuilder.DropColumn(
                name: "ProvinceStartStationId",
                table: "BusRoutes");
        }
    }
}
