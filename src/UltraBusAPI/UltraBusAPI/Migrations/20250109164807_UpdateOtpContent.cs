using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UltraBusAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateOtpContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "OTPs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "OTPs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "OTPs");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "OTPs");
        }
    }
}
