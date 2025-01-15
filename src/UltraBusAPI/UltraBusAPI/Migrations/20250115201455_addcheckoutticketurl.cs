using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UltraBusAPI.Migrations
{
    /// <inheritdoc />
    public partial class addcheckoutticketurl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CheckoutUrl",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheckoutUrl",
                table: "Tickets");
        }
    }
}
