using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UltraBusAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTicketTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailableSeats",
                table: "BusRouteTrips");

            migrationBuilder.CreateTable(
                name: "BusRouteStations",
                columns: table => new
                {
                    BusRouteId = table.Column<int>(type: "int", nullable: false),
                    BusStationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusRouteStations", x => new { x.BusRouteId, x.BusStationId });
                    table.ForeignKey(
                        name: "FK_BusRouteStations_BusRoutes_BusRouteId",
                        column: x => x.BusRouteId,
                        principalTable: "BusRoutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BusRouteStations_BusStations_BusStationId",
                        column: x => x.BusStationId,
                        principalTable: "BusStations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BusRouteTripDates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusRouteTripId = table.Column<int>(type: "int", nullable: true),
                    DepartureDay = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DepartureTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ArrivalTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SeatArrangement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SeatArrangementStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AvailableSeats = table.Column<int>(type: "int", nullable: true),
                    StartStationId = table.Column<int>(type: "int", nullable: true),
                    EndStationId = table.Column<int>(type: "int", nullable: true),
                    Stations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusRouteTripDates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BusRouteTripDates_BusRouteTrips_BusRouteTripId",
                        column: x => x.BusRouteTripId,
                        principalTable: "BusRouteTrips",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BusRouteTripDates_BusStations_EndStationId",
                        column: x => x.EndStationId,
                        principalTable: "BusStations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BusRouteTripDates_BusStations_StartStationId",
                        column: x => x.StartStationId,
                        principalTable: "BusStations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    BusRouteTripDateId = table.Column<int>(type: "int", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    SeatNumbers = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BusStationUpId = table.Column<int>(type: "int", nullable: true),
                    BusStationDownId = table.Column<int>(type: "int", nullable: true),
                    ToTalSeats = table.Column<int>(type: "int", nullable: true),
                    TotalPrice = table.Column<double>(type: "float", nullable: true),
                    CustomerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    ReceivedAmount = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_BusRouteTripDates_BusRouteTripDateId",
                        column: x => x.BusRouteTripDateId,
                        principalTable: "BusRouteTripDates",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tickets_BusStations_BusStationDownId",
                        column: x => x.BusStationDownId,
                        principalTable: "BusStations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tickets_BusStations_BusStationUpId",
                        column: x => x.BusStationUpId,
                        principalTable: "BusStations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tickets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BusRouteStations_BusStationId",
                table: "BusRouteStations",
                column: "BusStationId");

            migrationBuilder.CreateIndex(
                name: "IX_BusRouteTripDates_BusRouteTripId",
                table: "BusRouteTripDates",
                column: "BusRouteTripId");

            migrationBuilder.CreateIndex(
                name: "IX_BusRouteTripDates_EndStationId",
                table: "BusRouteTripDates",
                column: "EndStationId");

            migrationBuilder.CreateIndex(
                name: "IX_BusRouteTripDates_StartStationId",
                table: "BusRouteTripDates",
                column: "StartStationId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_BusRouteTripDateId",
                table: "Tickets",
                column: "BusRouteTripDateId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_BusStationDownId",
                table: "Tickets",
                column: "BusStationDownId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_BusStationUpId",
                table: "Tickets",
                column: "BusStationUpId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_UserId",
                table: "Tickets",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusRouteStations");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "BusRouteTripDates");

            migrationBuilder.AddColumn<int>(
                name: "AvailableSeats",
                table: "BusRouteTrips",
                type: "int",
                nullable: true);
        }
    }
}
