using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UltraBusAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateOtpStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsUsed",
                table: "OTPs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Sent",
                table: "OTPs",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsUsed",
                table: "OTPs");

            migrationBuilder.DropColumn(
                name: "Sent",
                table: "OTPs");
        }
    }
}
