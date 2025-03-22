using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contractors",
                columns: table => new
                {
                    ContractorId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ContractorName = table.Column<string>(type: "TEXT", nullable: false),
                    ContractorLocation = table.Column<string>(type: "TEXT", nullable: false),
                    ContractorIndustry = table.Column<string>(type: "TEXT", nullable: false),
                    ContractorPhoneNumber = table.Column<string>(type: "TEXT", nullable: false),
                    ContractorReview = table.Column<string>(type: "TEXT", nullable: false),
                    ContractorCoverPhoto = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contractors", x => x.ContractorId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contractors");
        }
    }
}
